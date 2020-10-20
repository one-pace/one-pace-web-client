import React, { useState } from 'react';
import App from 'next/app';
import 'normalize.css';
import WebTorrent from 'webtorrent';

import AppContext from '../context';
import { appWithTranslation } from '../core/i18n';

const torrentClient = new WebTorrent({
  maxConns: 55,
});

const OnePaceApp = ({ Component, pageProps, pathname, query, ...context }) => {
  const [isNavVisible, setNavVisibility] = useState(true);
  const [screenOrientation, setScreenOrientation] = useState('landscape');

  return (
    <AppContext.Provider
      value={{
        ...context,
        isNavVisible,
        pathname,
        query,
        setNavVisibility,
        screenOrientation,
        setScreenOrientation,
        torrentClient,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};

OnePaceApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(OnePaceApp);
