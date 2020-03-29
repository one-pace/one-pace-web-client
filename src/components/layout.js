import React from 'react'
import { Link } from 'react-router-dom';

export default class Layout extends React.Component {
  render () {
    return (
      <div className='layout-container'>
        <div className='topnav bottom-shadow'>
          <Link to='/'>
            <img className='logo' src={require('../images/Logo.png')} />
          </Link>
          <Link className='link text-link' to='/about'>About</Link>
          <Link className='link text-link' to='/overview'>Overview</Link>
          <a
            className='link link-right'
            title='Discord'
            target='_blank'
            rel='noopener noreferrer'
            href='https://discordapp.com/invite/WHpTJdP'
          >
            <img src={require('../images/discord.svg')} />
          </a>
          <a
            className='link link-right'
            title='Arlong Park Forums'
            target='_blank'
            rel='noopener noreferrer'
            href='http://forums.arlongpark.net/showthread.php?t=38681'
          >
            <img src={require('../images/arlongpark.svg')} />
          </a>
        </div>
        <div className='main-content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
