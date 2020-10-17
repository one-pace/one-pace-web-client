import React from 'react';
import NetworkHandler from '../networkHandler';
import I18n from 'i18n-js'
import moment from 'moment';

export default class Torrents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      torrents: []
    };
  }

  componentDidMount() {
    NetworkHandler.request('get_torrents.php', null, (response) => {
      const { torrents } = response;
      this.setState({ torrents });
    });
  }

  render() {
    return (
      <table cellSpacing={0} className='torrents-list'>
        <thead>
            <tr>
              <th scope="col">{I18n.t('torrents.name')}</th>
              <th scope="col">{I18n.t('torrents.link')}</th>
              <th scope="col">{I18n.t('torrents.size')}</th>
              <th scope="col">{I18n.t('torrents.date')}</th>
            </tr>
        </thead>
        <tbody>
        {this.state.torrents.map((torrent, index) => {
            const { hash, display_name, size, created } = torrent
            return (
                <tr key={hash + index}>
                    <td><a href={'https://api.onepace.net/download/magnet.php?hash=' + hash}>{display_name}.torrent</a></td>
                    <td>
                      <a className="torrent-link" href={`https://api.onepace.net/download/torrent.php?hash=${hash}`}><i className="fas fa-file-download" /></a>
                      <a className="torrent-link" href={`https://api.onepace.net/download/magnet.php?hash=${hash}`}><i className="fas fa-magnet" /></a>
                    </td>
                    <td>{size}</td>
                    <td>{moment(created).format('YYYY-MM-DD')}</td>
                </tr>
            )
            })}
        </tbody>
      </table>
    );
  }
}
