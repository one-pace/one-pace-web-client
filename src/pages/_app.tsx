import React, { useState } from 'react';
import App from 'next/app';

import 'normalize.css';
import '../components/react-md.scss';
import '../components/variables.css';
import '../components/globals.css';

import AppContext from '../context';
import { appWithTranslation, useTranslation } from '../core/i18n';

const OnePaceApp = ({ Component, pageProps, pathname, query, ...context }) => {
  const { i18n } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isNavVisible, setNavVisibility] = useState(true);
  const [language, setLanguage] = useState(i18n.language);
  const [screenOrientation, setScreenOrientation] = useState('landscape');

  const toggleEditing = () => setIsEditing(!isEditing);

  return (
    <AppContext.Provider
      value={{
        ...context,
        isEditing,
        isNavVisible,
        language,
        pathname,
        query,
        setLanguage,
        setNavVisibility,
        screenOrientation,
        setScreenOrientation,
        toggleEditing,
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
