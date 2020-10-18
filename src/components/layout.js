import React from 'react'
import { Link } from 'react-router-dom'
import I18n from 'i18n-js'
import { setLocale } from '../utils/i18n'
import LocalStorageUtils from '../localStorageUtils'

class Layout extends React.Component {
  constructor() {
    super()
    this.state = {
      locale: LocalStorageUtils.getLocale()
    }
  }

  renderLocaleSelector = () => {
    return (
      <span className="link link-right" style={{ top: 2, position: 'relative', marginRight: 10 }}>
        <i className="fas fa-globe" style={{ top: 1, position: 'relative' }}></i>
        <select className="lang" id="inputGroupSelect01" value={this.state.locale} onChange={(e) => {
          const locale = e.target.value
          this.setState({ locale })
          LocalStorageUtils.setLocale(locale)
          setLocale(locale)
          location.reload()
        }}>
          <option value="de-DE">Deutsch</option>
          <option defaultValue value="en-US">English</option>
          <option value="es-ES">Español</option>
          <option value="fr-FR">Français</option>
          {/* <option value="ja">日本語</option> */}
        </select>
      </span>
    )
  }

  render() {
    return (
      <div className="layout-container">
        <div className="topnav bottom-shadow">
          <Link to="/">
            <img alt="" className="logo" src={require('../images/Logo.png')} />
          </Link>
          <Link className="link text-link" to="/about">
            {I18n.t('nav.about')}
          </Link>
          <Link className="link text-link" to="/overview">
            {I18n.t('nav.overview')}
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
          {this.renderLocaleSelector()}
        </div>
        <div className="main-content">{this.props.children}</div>
      </div>
    )
  }
}

export default Layout
