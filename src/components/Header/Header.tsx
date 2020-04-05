import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import s from './Header.css';
import Navigation from '../Navigation';

import logoUrl from './Logo.png';

type PropTypes = {
  path?: string;
  title: string;
};

const Header = ({ path, title }: PropTypes) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <header className={s.root} id="site-header">
      <div className={s.container}>
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={s.brand}>
            <img
              src={logoUrl}
              srcSet={`${logoUrl} 2x`}
              height="80"
              alt="One Pace logo"
            />
          </a>
        </Link>
        <Navigation path={path} />
      </div>
    </header>
  </>
);

export default Header;
