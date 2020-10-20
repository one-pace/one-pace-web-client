import NextI18Next from 'next-i18next';
import getConfig from 'next/config';
import { resolve } from 'path';

const { localeSubpaths } = getConfig().publicRuntimeConfig;

const I18Next = new NextI18Next({
  defaultLanguage: 'en',
  ignoreRoutes: ['/api/', '/build/', '/public/', '/prisma/', '/static/'],
  localeSubpaths,
  localePath: resolve('public/static/locales'),
  otherLanguages: ['de', 'en', 'es', 'fr' /* 'jp' */],
});

export const { appWithTranslation, useTranslation, withTranslation } = I18Next;

export default I18Next;
