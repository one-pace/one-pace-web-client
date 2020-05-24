import React from 'react';
import NetworkHandler from '../networkHandler';

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
              <th scope="col">Name</th>
              <th scope="col">Link</th>
              <th scope="col">Size</th>
              <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody>
        {this.state.torrents.map((torrent, index) => {
            const { hash, display_name, size, created } = torrent
            return (
                <tr key={hash + index}>
                    <td><a href={'http://api.onepace.net/download/magnet.php?hash=' + hash}>{display_name}.torrent</a></td>
                    <td>
                      <a className="torrent-link" href={`http://api.onepace.net/download/torrent.php?hash=${hash}`}><i className="fas fa-file-download" /></a>
                      <a className="torrent-link" href={`http://api.onepace.net/download/magnet.php?hash=${hash}`}><i className="fas fa-magnet" /></a>
                    </td>
                    <td>{size}</td>
                    <td>{created}</td>
                </tr>
            )
            })}
        </tbody>
      </table>
    );
  }
}
