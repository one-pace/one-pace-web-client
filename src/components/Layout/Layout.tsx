import React, { useContext, useState } from 'react';
// import cn from 'classnames';

import 'normalize.css';
import s from './Layout.css';

import AppContext from '../../context';
import Header from '../Header';

type Props = {
  // showDrawer?: boolean;
  // showHeader?: boolean;
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  // showDrawer,
  // showHeader,
  title,
}) => {
  const { pathname } = useContext(AppContext);

  return (
    <div className={s.root}>
      <Header path={pathname} title={title} />
      {children}
    </div>
  );
};

Layout.defaultProps = {
  // showDrawer: true,
  // showHeader: true,
  title: 'Untitled',
};

export default Layout;
