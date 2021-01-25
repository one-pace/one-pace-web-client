import React, { useState } from 'react';
import App from 'next/app';
import 'normalize.css';

import '../components/react-md.scss';

import AppContext from '../context';
import { appWithTranslation } from '../core/i18n';

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
