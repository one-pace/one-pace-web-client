import React, { useContext } from 'react';
import cn from 'classnames';
// import { mdiMenuOpen } from '@mdi/js';
// import { Icon } from '@mdi/react';
import Link from 'next/link';

import s from './Navigation.module.css';

type Props = {
  className?: string;
  onClick?: Function;
  path?: string;
};

const Navigation: React.FunctionComponent<Props> = ({ className, path }) => {
  return (
    <nav className={cn(s.root, className)}>
      <ul>
        {/*
        <li className={cn(s.link, path === '/my-account' && s.active)}>
          <Link href="/my-account">My Account</Link>
        </li>
        <li className={cn(s.link, path === '/register' && s.active)}>
          <Link href="/register">Sign up</Link>
        </li>
        */}
      </ul>
    </nav>
  );
};

export default Navigation;
