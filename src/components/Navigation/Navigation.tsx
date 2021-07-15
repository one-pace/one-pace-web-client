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

        <li className={cn(s.link, path === '/en/about' && s.active)}>
          <Link href="/en/about">About</Link>
        </li>
        <li className={cn(s.link, path === '/register' && s.active)}>
          <Link href="/login">Sign in</Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;
