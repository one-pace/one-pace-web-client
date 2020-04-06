import React from 'react';
import cookie from 'cookie';
import { NextPage } from 'next';
import App from 'next/app';
import Head from 'next/head';

import initApollo from './apollo';
import {
  ApolloContext,
  InitApolloClient,
  WithApolloOptions,
  WithApolloProps,
  WithApolloState,
} from './withApolloTypes';

interface GetTokenRequestObject {
  headers?: {
    cookie?: string;
  };
}

const __DEV__ = process.env.NODE_ENV !== 'production';

export const getToken = (req?: GetTokenRequestObject) => {
  const cookies = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
  );
  return cookies.token;
};

const getDisplayName = (Component: React.ComponentType<any>) =>
  Component.displayName || Component.name || 'Unknown';

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export default function withApollo<TCache = any>(
  client: InitApolloClient<TCache>,
  options: WithApolloOptions = {},
) {
  type ApolloProps = Partial<WithApolloProps<TCache>>;

  return (
    Page: NextPage<any> | typeof App,
    pageOptions: WithApolloOptions = {},
  ) => {
    const { getInitialProps } = Page;
    const getDataFromTree =
      'getDataFromTree' in pageOptions
        ? pageOptions.getDataFromTree
        : options.getDataFromTree;
    const render = pageOptions.render || options.render;

    const WithApollo = ({ apollo, apolloState, ...pageProps }: ApolloProps) => {
      const apolloClient =
        apollo ||
        initApollo(client, { getToken, initialState: apolloState?.data });

      if (render) {
        return render({
          Page: Page as NextPage<any>,
          props: { ...pageProps, apollo: apolloClient },
        });
      }

      return <Page {...pageProps} apollo={apolloClient} />;
    };

    WithApollo.displayName = `withApollo(${getDisplayName(Page)})`;

    if (getInitialProps || getDataFromTree) {
      WithApollo.getInitialProps = async (pageCtx: ApolloContext) => {
        const ctx = 'Component' in pageCtx ? pageCtx.ctx : pageCtx;
        const { AppTree } = pageCtx;
        const headers = ctx.req ? ctx.req.headers : {};

        // Initialize ApolloClient, add it to the ctx object so
        // we can use it in `getInitialProps`.
        const apollo = initApollo<TCache>(client, {
          ctx,
          getToken: () => getToken(ctx.req),
          headers,
        });
        const apolloState: WithApolloState<TCache> = {};

        // Run wrapped getInitialProps methods
        let pageProps = {};
        if (getInitialProps) {
          ctx.apolloClient = apollo;
          pageProps = await getInitialProps(pageCtx as any);
        }

        // Only on the server:
        if (typeof window === 'undefined') {
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
            return pageProps;
          }

          // Only if ssr is enabled
          if (getDataFromTree) {
            try {
              // Run all GraphQL queries
              const props = { ...pageProps, apolloState, apollo };
              const appTreeProps =
                'Component' in pageCtx ? props : { pageProps: props };

              await getDataFromTree(<AppTree {...appTreeProps} />);
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              if (__DEV__) {
                // Handle them in components via the data.error prop:
                // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                console.error(
                  'GraphQL error occurred [getDataFromTree]',
                  error,
                );
              }
            }

            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind();

            // Extract query data from the Apollo store
            apolloState.data = apollo.cache.extract();
          }
        }

        // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
        // to the component, otherwise the component would have to call initApollo() again but this
        // time without the context, once that happens the following code will make sure we send
        // the prop as `null` to the browser
        (apollo as any).toJSON = () => {
          return null;
        };

        return {
          ...pageProps,
          apolloState,
          apollo,
        };
      };
    }

    return WithApollo;
  };
}
