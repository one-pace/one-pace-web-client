import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => (
  <div className="layout-container">
    <div className="topnav bottom-shadow">
      <Link to="/">
        <img alt="" className="logo" src={require('../images/Logo.png')} />
      </Link>
      <Link className="link text-link" to="/about">
        About
      </Link>
      <Link className="link text-link" to="/overview">
        Overview
      </Link>
      <Link className="link text-link" to="/issues">
        Known issues
      </Link>
      <a
        className="link link-right"
        title="Discord"
        target="_blank"
        rel="noopener noreferrer"
        href="https://discordapp.com/invite/WHpTJdP"
      >
        <img alt="" src={require('../images/discord.svg')} />
      </a>
      <a
        className="link link-right"
        title="Arlong Park Forums"
        target="_blank"
        rel="noopener noreferrer"
        href="http://forums.arlongpark.net/showthread.php?t=38681"
      >
        <img alt="" src={require('../images/arlongpark.svg')} />
      </a>
    </div>
    <div className="main-content">{children}</div>
  </div>
);

export default Layout;
