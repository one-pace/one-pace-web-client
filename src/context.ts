import { createContext, createRef, RefObject } from 'react';

export type AppContextTypes = {
  isNavVisible: boolean;
  pathname: string;
  query?: Object;
  screenOrientation: 'portrait' | 'landscape' | string;
  setNavVisibility: Function;
  setScreenOrientation: Function;
};

export type SliderContextTypes = {
  currentSlide: number;
  elementRef: RefObject<any>;
  onCloseSlide: () => void;
  onSelectSlide: () => void;
};

const AppContext = createContext<AppContextTypes>({
  isNavVisible: false,
  pathname: '',
  query: {},
  screenOrientation: 'portrait',
  setNavVisibility: () => {},
  setScreenOrientation: () => {},
});

export const SliderContext = createContext<SliderContextTypes>({
  currentSlide: 0,
  elementRef: createRef(),
  onCloseSlide: () => {},
  onSelectSlide: () => {},
});

export default AppContext;
