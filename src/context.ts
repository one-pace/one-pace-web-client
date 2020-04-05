import { createContext } from 'react';
import { WebTorrent } from 'webtorrent';

export type AppContextTypes = {
  isNavVisible: boolean;
  pathname: string;
  query?: Object;
  screenOrientation: 'portrait' | 'landscape' | string;
  setNavVisibility: Function;
  setScreenOrientation: Function;
  torrentClient: WebTorrent;
};

const AppContext = createContext<AppContextTypes>({
  isNavVisible: false,
  pathname: '',
  query: {},
  screenOrientation: 'portrait',
  setNavVisibility: () => {},
  setScreenOrientation: () => {},
  torrentClient: () => {},
});

export default AppContext;
