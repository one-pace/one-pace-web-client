import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import apolloLogger from 'apollo-link-logger';
import gql from 'graphql-tag';
import getConfig from 'next/config';
import React from 'react';

import withApollo from './withApolloHOC';
import schema from '../data/schema';
import {
  resolvers as clientResolvers,
  schema as clientSchema,
} from '../data/graphql/OnMemoryState/schema';

const __DEV__ = process.env.NODE_ENV !== 'production';
const { WEB_URL } = getConfig().publicRuntimeConfig;

function createIsomorphLink(context: { getToken: () => string }) {
  const isServer = typeof window === 'undefined';

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
  if (isServer) {
    const { SchemaLink } = require('apollo-link-schema'); // eslint-disable-line global-require
    const { makeExecutableSchema } = require('graphql-tools'); // eslint-disable-line global-require
    console.info('createIsomorphLink context', context);
    links.push(
      new SchemaLink({ schema: makeExecutableSchema(schema), context }),
    );

    // @ts-ignore-next-line
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
    uri: isServer
      ? 'http://localhost:3000/api/graphql'
      : `${WEB_URL}/api/graphql`,
  });

  links.push(
    ...(__DEV__ ? [apolloLogger] : []),
    authLink,
    // @ts-ignore-next-line
    httpLink,
  );

  // @ts-ignore-next-line
  return from(links);
}

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

export default withApollo(
  ({ initialState }) => createApolloClient(initialState),
  {
    render: ({ Page, props }) => (
      <ApolloProvider client={props.apollo}>
        <Page {...props} />
      </ApolloProvider>
    ),
  },
);
