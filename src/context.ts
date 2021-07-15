import { createContext, createRef, RefObject } from 'react';

export type AppContextTypes = {
  isEditing: boolean;
  isNavVisible: boolean;
  language: string;
  pathname: string;
  query?: Object;
  screenOrientation: 'portrait' | 'landscape' | string;
  setLanguage: (lang: string) => void;
  setNavVisibility: Function;
  setScreenOrientation: Function;
  toggleEditing: () => void;
};

export type SliderContextTypes = {
  currentSlide: number;
  elementRef: RefObject<any>;
  onCloseSlide: () => void;
  onSelectSlide: () => void;
};

const AppContext = createContext<AppContextTypes>({
  isEditing: false,
  isNavVisible: false,
  language: 'en',
  pathname: '',
  query: {},
  screenOrientation: 'portrait',
  setLanguage: _lang => {},
  setNavVisibility: () => {},
  setScreenOrientation: () => {},
  toggleEditing: () => {},
});

export const SliderContext = createContext<SliderContextTypes>({
  currentSlide: 0,
  elementRef: createRef(),
  onCloseSlide: () => {},
  onSelectSlide: () => {},
});

export default AppContext;
