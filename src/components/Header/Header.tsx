import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ListboxChangeEventHandler, Select } from '@react-md/form';
import { ArrowDropDownSVGIcon } from '@react-md/material-icons';

import s from './Header.module.css';
import { useTranslation } from '../../core/i18n';
import { media1x, media2x, media3x } from '../Image';
import Navigation from '../Navigation';

type PropTypes = {
  path?: string;
  title: string;
};

const srcFallback = '/images/Logo.png';
const src1x = '/images/Logo.webp';
const src2x = '/images/Logo@2x.webp';
const src3x = '/images/Logo@3x.webp';

const LANGUAGES = [
  {
    children: (
      <span>
        English (<span className="rmd-typography--bold">EN</span>)
      </span>
    ),
    label: 'English',
    value: 'en',
  },
  {
    children: (
      <span>
        Japanese (<span className="rmd-typography--bold">JP</span>)
      </span>
    ),
    label: 'Japanese',
    value: 'jp',
  },
  {
    children: (
      <span>
        Spanish (<span className="rmd-typography--bold">ES</span>)
      </span>
    ),
    label: 'Spanish',
    value: 'es',
  },
  {
    children: (
      <span>
        French (<span className="rmd-typography--bold">FR</span>)
      </span>
    ),
    label: 'French',
    value: 'fr',
  },
  {
    children: (
      <span>
        German (<span className="rmd-typography--bold">DE</span>)
      </span>
    ),
    label: 'German',
    value: 'de',
  },
  {
    children: (
      <span>
        Portuguese (<span className="rmd-typography--bold">PT</span>)
      </span>
    ),
    label: 'Portuguese',
    value: 'pt',
  },
  {
    children: (
      <span>
        Arabic (<span className="rmd-typography--bold">AR</span>)
      </span>
    ),
    label: 'Arabic',
    value: 'ar',
  },
  {
    children: (
      <span>
        Italian (<span className="rmd-typography--bold">IT</span>)
      </span>
    ),
    label: 'Italian',
    value: 'it',
  },
];

const Header = ({ path, title }: PropTypes) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChangeLanguage: ListboxChangeEventHandler = (
    nextValue: string,
  ) => {
    setLanguage(nextValue);
    i18n.changeLanguage(nextValue);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={s.root} id="site-header">
        <div className={s.container}>
          <Link href="/">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={s.brand}>
              <picture>
                <source media={media3x} srcSet={src3x} type="image/webp" />
                <source media={media2x} srcSet={src2x} type="image/webp" />
                <source media={media1x} srcSet={src1x} type="image/webp" />
                <source srcSet={srcFallback} type="image/jpeg" />
                <img alt="One Pace logo" src={srcFallback} />
              </picture>
            </a>
          </Link>
          <Navigation path={path} />
          <Select
            id="select--language"
            label="Select language"
            listboxWidth="auto"
            onChange={handleChangeLanguage}
            options={LANGUAGES}
            rightChildren={<ArrowDropDownSVGIcon />}
            value={language}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
