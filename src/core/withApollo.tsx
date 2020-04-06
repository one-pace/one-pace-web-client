import React from 'react';
import cookie from 'cookie';
import gql from 'graphql-tag';
import Head from 'next/head';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { setContext } from 'apollo-link-context';
import apolloLogger from 'apollo-link-logger';

import schema from '../data/schema';

import {
  resolvers as clientResolvers,
  schema as clientSchema,
} from '../data/graphql/OnMemoryState/schema';

interface WithApolloTypes {
  apolloClient: any;
  apolloState: any;
}

interface GetTokenRequestObject {
  headers?: {
    cookie?: string;
  };
}

const __DEV__ = process.env.NODE_ENV !== 'production';

let globalApolloClient = null;

function createIsomorphLink(context: { getToken: () => string }) {
  const links = [
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.warn(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) console.warn(`[Network error]: ${networkError}`);
    }),
  ];

  // Server-side link
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema'); // eslint-disable-line global-require
    const { makeExecutableSchema } = require('graphql-tools'); // eslint-disable-line global-require
    console.info('createIsomorphLink context', context);
    links.push(
      new SchemaLink({ schema: makeExecutableSchema(schema), context }),
    );
    return from(links);
  }

  const authLink = setContext((_, { headers }) => {
    const token = context.getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Client-side link
  const httpLink = createHttpLink({
    credentials: 'same-origin',
    uri: 'http://localhost:3000/api/graphql',
  });

  links.push(
    ...(__DEV__ ? [apolloLogger] : []),
    authLink,
    new RetryLink(),
    // @ts-ignore-next-line
    httpLink,
  );

  return from(links);
}

export const getToken = (req?: GetTokenRequestObject) => {
  const cookies = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
  );
  return cookies.token;
};

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
// eslint-disable-next-line no-shadow
function createApolloClient(initialState?: any, { getToken = () => '' } = {}) {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode,
    // @ts-ignore-next-line
    link: createIsomorphLink({ getToken }),
    resolvers: clientResolvers,
    typeDefs: gql(clientSchema),
    cache,
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
const initApolloClient = (...args: any[]) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...args);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(...args);
  }

  return globalApolloClient;
};

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export const withApollo = (
  PageComponent: any,
  { ssr = true }: { ssr?: boolean } = {},
) => {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: WithApolloTypes) => {
    const client = apolloClient || initApolloClient(apolloState, { getToken });
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getStaticProps || PageComponent.getServerSideProps) {
    const getProps = async (ctx: any) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line no-multi-assign
      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        { getToken: () => getToken(ctx.req) },
      ));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getStaticProps) {
        pageProps = await PageComponent.getStaticProps(ctx);
      }

      if (PageComponent.GetServerSideProps) {
        pageProps = await PageComponent.getServerSideProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };

    WithApollo.getStaticProps = getProps;
    WithApollo.getServerSideProps = getProps;
  }

  return WithApollo;
};
