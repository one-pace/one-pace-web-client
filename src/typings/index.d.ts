// Declare globals
// eslint-disable-next-line no-unused-vars
declare const __DEV__: boolean;

// Extend globals
interface Window {
  ga: any;
  App: any;
}
interface NodeModule {
  hot: any;
}

// Extend existing modules
declare module 'child_process' {
  interface ChildProcess {
    host?: string;
  }
}

// Declare modules for non-typed packages
declare module 'react-deep-force-update';
declare module 'apollo-link-logger';
declare module 'webpack-hot-middleware/client';
declare module 'react-dev-utils/launchEditorEndpoint';
declare module 'react-dev-utils/errorOverlayMiddleware';
declare module 'react-notifications-component';
declare module 'react-error-overlay';
declare module 'react-test-renderer';
declare module 'terminate';

// Declare non-ts modules to be loaded by webpack loaders
declare module '*.css';
declare module '*.md';
declare module '*.png';
declare module '*.graphql' {
  /* eslint no-unused-vars:0 */
  import { DocumentNode } from 'graphql';

  /* eslint vars-on-top:0 */
  /* eslint no-var:0 */
  var d: DocumentNode;
  /* eslint import/export:0 */
  export default d;
}
