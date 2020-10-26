import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import s from './Header.css';
import Image, { media1x, media2x, media3x } from '../Image';
import Navigation from '../Navigation';

type PropTypes = {
  path?: string;
  title: string;
};

const srcFallback = '/images/Logo.png';
const src1x = '/images/Logo.webp';
const src2x = '/images/Logo@2x.webp';
const src3x = '/images/Logo@3x.webp';

const Header = ({ path, title }: PropTypes) => (
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
      </div>
    </header>
  </>
);

export default Header;
