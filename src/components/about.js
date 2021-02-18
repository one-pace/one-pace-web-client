import React from 'react'
import music from '../media/151.mp3'
import crying from '../media/Eh.mp3'
import I18n from 'i18n-js'

class About extends React.Component {
  constructor () {
    super()
    this.tearsTimeout = null
    this.respects = new Audio(music)
    this.tears = new Audio(crying)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.payRespects)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.payRespects)
    this.respects.pause()
    this.respects.currentTime = 0
    this.tears.pause()
    this.tears.currentTime = 0
    clearTimeout(this.tearsTimeout)
  }

  payRespects = (event) => {
    if (event.type === 'click' || event.key === 'f' || event.code === 'KeyF') {
      this.respects.play()
      this.tearsTimeout = setTimeout(() => this.tears.play(), 3500)
    }
  }

  renderQC = () => {
    return <abbr title={I18n.t('about.qualityChecking')}>{I18n.t('about.qc')}</abbr>
  }

  render() {
    return (
      <div className="about">
        <div>
          <h2>{I18n.t('about.title')}</h2>
          <p>{I18n.t('about.description')}</p>
          <h2>{I18n.t('about.team')}</h2>
          <table>
            <tbody>
              <tr>
                <td>Galaxy 9000</td>
                <td>{I18n.t('about.editing')}, {I18n.t('about.timing')}</td>
              </tr>
              <tr>
                <td>Sewil</td>
                <td>{I18n.t('about.editing')}, {I18n.t('about.timing')}, {I18n.t('about.webmaster')}</td>
              </tr>
              <tr>
                <td>Feeso</td>
                <td>
                  {I18n.t('about.editing')}, {this.renderQC()}
                </td>
              </tr>
              <tr>
                <td>Halee</td>
                <td>{I18n.t('about.musicer')}, {I18n.t('about.timing')}</td>
              </tr>
              <tr>
                <td>Datenshi</td>
                <td>{I18n.t('about.timing')}, {I18n.t('about.graphics')}</td>
              </tr>
              <tr>
                <td>Grug</td>
                <td>
                  {this.renderQC()}
                </td>
              </tr>
              <tr>
                <td>Pepperjack</td>
                <td>
                  {this.renderQC()}
                </td>
              </tr>
              <tr>
                <td width="50%">Kaitou Yahiko</td>
                <td>{I18n.t('about.timing')}, {I18n.t('about.vfx')}</td>
              </tr>
              <tr>
                <td>Rael</td>
                <td>{I18n.t('about.editing')}</td>
              </tr>
              <tr>
                <td>Lance</td>
                <td>{I18n.t('about.timing')}</td>
              </tr>
              <tr>
                <td>Gi-a Fosu</td>
                <td>{I18n.t('about.webmaster')}</td>
              </tr>
              <tr>
                <td>DolphinWeabu</td>
                <td>
                  {this.renderQC()}
                </td>
              </tr>
              <tr>
                <td>Gaijin</td>
                <td>{I18n.t('about.translation')}</td>
              </tr>
              <tr>
                <td>Gigglebot</td>
                <td>{I18n.t('about.editing')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>{I18n.t('about.memorialTitle')}</h2>
          <p>{I18n.t('about.memorialDescription')}</p>
          <div className="pay-respects">
            <button onClick={this.payRespects}>{I18n.t('about.memorialF')}</button>
          </div>
          <img alt="" src={require('../images/MasterRoshiSmoking.png')} />
        </div>
      </div>
    )
  }
}

export default About
