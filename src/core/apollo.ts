import { ApolloClient } from '@apollo/client';
// Polyfill fetch
import 'isomorphic-unfetch';
import { InitApolloClient, InitApolloOptions } from './withApolloTypes';

let globalApolloClient: ApolloClient<any>;

function getClient<TCache>(
  clientFn: InitApolloClient<TCache>,
  options: InitApolloOptions<TCache>,
) {
  if (typeof clientFn !== 'function') {
    throw new Error(
      '[withApollo] requires a function that returns an ApolloClient',
    );
  }

  return clientFn(options);
}

export default function initApollo<TCache = any>(
  clientFn: InitApolloClient<TCache>,
  options?: InitApolloOptions<TCache>,
): ApolloClient<TCache> {
  if (!clientFn) {
    throw new Error(
      '[withApollo] the first param is missing and is required to get the ApolloClient',
    );
  }

  if (typeof window === 'undefined') {
    return getClient<TCache>(clientFn, options);
  }

  if (!globalApolloClient) {
    globalApolloClient = getClient<TCache>(clientFn, options);
  }

  return globalApolloClient;
}
