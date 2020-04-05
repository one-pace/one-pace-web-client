import React, { useState } from 'react';
import WebTorrent from 'webtorrent';

import AppContext from '../context';

const torrentClient = new WebTorrent({
  maxConns: 55,
});

const App = ({ Component, pageProps, pathname, query, ...context }) => {
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

export default App;
