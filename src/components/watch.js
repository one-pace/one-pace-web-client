import React from 'react';
import queryString from 'query-string';
import NetworkHandler from '../networkHandler';
import LocalStorageUtils from '../localStorageUtils';

export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.changeArc = this.changeArc.bind(this);
    this.changeEpisode = this.changeEpisode.bind(this);
    this.nav = this.nav.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.torrentLink = this.torrentLink.bind(this);
    this.magnetLink = this.magnetLink.bind(this);
    this.getEpisodePart = this.getEpisodePart.bind(this);
    this.state = {
      selectedArc: null,
      selectedEpisode: null,
      episodes: [],
      arcs: [],
    };
  }

  componentDidMount() {
    NetworkHandler.request('get_streams.php', null, (response) => {
      const { arcs, episodes } = response;
      let selectedArc = null;
      let selectedEpisode = null;
      const search = queryString.parse(this.props.location.search);
      const selectedEpisodeId = search.episode
        ? search.episode
        : LocalStorageUtils.getWatchSelectedEpisodeId();
      const selectedArcId = LocalStorageUtils.getWatchSelectedArcId();
      if (!isNaN(selectedEpisodeId)) {
        const id = Number.parseInt(selectedEpisodeId);
        selectedEpisode = episodes.find((i) => i.id === id);
      } else if (selectedEpisodeId) {
        selectedEpisode = episodes.find((i) => i.crc32 === selectedEpisodeId);
      }
      if (!selectedEpisode && selectedArcId) {
        [selectedArc] = arcs.filter((i) => i.id === selectedArcId);
      }
      if (!selectedArc && selectedEpisode) {
        [selectedArc] = arcs.filter((i) => i.id === selectedEpisode.arcId);
      }
      if (!selectedArc && !selectedEpisode) {
        [selectedArc] = arcs;
      }
      if (selectedArc && !selectedEpisode) {
        [selectedEpisode] = episodes.filter((i) => i.arcId === selectedArc.id);
      }
      LocalStorageUtils.setWatchSelectedEpisodeId(
        selectedEpisode ? selectedEpisode.id : null,
      );
      LocalStorageUtils.setWatchSelectedArcId(
        selectedArc ? selectedArc.id : null,
      );
      if (selectedEpisode) {
        this.props.history.push({ search: `?episode=${selectedEpisode.id}` });
      }
      this.setState({ selectedArc, selectedEpisode, arcs, episodes });
    });
  }

  changeArc(selectedArc) {
    let selectedEpisode = null;
    if (selectedArc) {
      [selectedEpisode] = this.state.episodes.filter(
        (i) => i.arcId === selectedArc.id,
      );
    }
    LocalStorageUtils.setWatchSelectedArcId(
      selectedArc ? selectedArc.id : null,
    );
    LocalStorageUtils.setWatchSelectedEpisodeId(
      selectedEpisode ? selectedEpisode.id : null,
    );
    this.props.history.push({ search: `?episode=${selectedEpisode.id}` });
    this.setState({ selectedArc, selectedEpisode }, () => {
      this.videoRef.current.load();
    });
  }

  changeEpisode(selectedEpisode) {
    LocalStorageUtils.setWatchSelectedEpisodeId(
      selectedEpisode ? selectedEpisode.id : null,
    );
    let { selectedArc } = this.state;
    if (
      selectedEpisode &&
      selectedArc &&
      selectedEpisode.arcId !== selectedArc.id
    ) {
      [selectedArc] = this.state.arcs.filter(
        (i) => i.id === selectedEpisode.arcId,
      );
      LocalStorageUtils.setWatchSelectedArcId(selectedArc.id);
    }
    this.props.history.push({ search: `?episode=${selectedEpisode.id}` });
    this.setState({ selectedArc, selectedEpisode }, () => {
      this.videoRef.current.load();
      this.videoRef.current.play();
    });
  }

  nav(dir) {
    const episodes = this.state.episodes.filter((i) => i.isReleased);
    for (let i = 0; i < episodes.length; i++) {
      const episode = episodes[i];
      if (episode.id === this.state.selectedEpisode.id) {
        if (
          !(
            (dir === 'prev' && i === 0) ||
            (dir === 'next' && i >= episodes.length - 1)
          )
        ) {
          const otherEpisode = episodes[dir === 'prev' ? i - 1 : i + 1];
          this.changeEpisode(otherEpisode);
        }
        break;
      }
    }
  }

  stopVideo() {
    this.videoRef.current.pause();
  }

  torrentLink(episode) {
    const torrentHash = episode.torrent_hash;
    return (
      <a
        className="torrent-link"
        href={`https://api.onepace.net/download/torrent.php?hash=${torrentHash}`}
        onClick={() => this.stopVideo()}
      >
        <i className="fas fa-file-download" />
      </a>
    );
  }

  magnetLink(episode) {
    const torrentHash = episode.torrent_hash;
    return (
      <a
        className="torrent-link"
        href={`https://api.onepace.net/download/magnet.php?hash=${torrentHash}`}
        onClick={() => this.stopVideo()}
      >
        <i className="fas fa-magnet" />
      </a>
    );
  }

  getEpisodePart(episodePart) {
    return episodePart ? `00${episodePart.toString()}`.slice(-2) : '';
  }

  render() {
    const { selectedArc, selectedEpisode, arcs, episodes } = this.state;
    return (
      <div className="watch">
        <div className="watch-top">
          <center>
            <select
              className="arcs"
              value={selectedArc ? selectedArc.id : 0}
              onChange={(e) => {
                const arcId = Number.parseInt(e.target.value);
                const [arc] = arcs.filter((i) => i.id === arcId);
                this.changeArc(arc);
              }}
            >
              {arcs.map((arc) => {
                let title = arc.chapters ? `(Chapter ${arc.chapters})` : '';
                title +=
                  (arc.title ? ` ${arc.title}` : ' Untitled') +
                  (arc.chapters ? ' Arc' : '');
                title += arc.released ? '' : ' (Unreleased)';
                return (
                  <option
                    disabled={!arc.released}
                    key={`arc${arc.id}`}
                    value={arc.id}
                  >
                    {title}
                  </option>
                );
              })}
            </select>
            <select
              className="episodes"
              value={selectedEpisode ? selectedEpisode.id : 0}
              onChange={(e) => {
                const episodeId = Number.parseInt(e.target.value);
                const [episode] = episodes.filter((i) => i.id === episodeId);
                this.changeEpisode(episode);
              }}
            >
              {episodes.length > 0 &&
                selectedArc &&
                episodes
                  .filter((i) => i.arcId === selectedArc.id)
                  .map((episode) => {
                    let title = 'Unknown episode';
                    if (episode.part) {
                      title = `${selectedArc.title} ${this.getEpisodePart(
                        episode.part,
                      )}`;
                    } else if (episode.chapters) {
                      title = `Chapter ${episode.chapters}`;
                    } else if (episode.title) {
                      title = episode.title;
                    }
                    title +=
                      (episode.part || episode.chapters) && episode.title
                        ? `: ${episode.title}`
                        : '';
                    title += !episode.isReleased ? ' (In progress)' : '';
                    return (
                      <option
                        disabled={!episode.isReleased}
                        key={`episode${episode.id}`}
                        value={episode.id}
                      >
                        {title}
                      </option>
                    );
                  })}
            </select>
            <span className="ep-nav" onClick={() => this.nav('prev')}>
              &nbsp; &laquo; &nbsp;
            </span>
            <span className="ep-nav" onClick={() => this.nav('next')}>
              &nbsp; &raquo; &nbsp;
            </span>
            {selectedEpisode && selectedEpisode.torrent_hash
              ? this.torrentLink(selectedEpisode)
              : selectedArc &&
                selectedArc.torrent_hash &&
                this.torrentLink(selectedArc)}
            {selectedEpisode && selectedEpisode.torrent_hash
              ? this.magnetLink(selectedEpisode)
              : selectedArc &&
                selectedArc.torrent_hash &&
                this.magnetLink(selectedArc)}
            {selectedEpisode && selectedEpisode.released_date && (
              <span style={{ marginLeft: 20 }}>
                Released: {selectedEpisode.released_date}
              </span>
            )}
            {selectedEpisode && selectedEpisode.chapters && (
              <span style={{ marginLeft: 20 }}>
                Chapters: {selectedEpisode.chapters}
              </span>
            )}
            {selectedEpisode && selectedEpisode.episodes && (
              <span style={{ marginLeft: 20 }}>
                Episodes: {selectedEpisode.episodes}
              </span>
            )}
          </center>
        </div>
        <div className="video-container">
          <video
            ref={this.videoRef}
            className="video-player"
            controls
            poster={require('../images/logo-poster.png')}
          >
            {selectedEpisode && (
              <source
                type="video/mp4"
                src={`/streams/${selectedEpisode.crc32}.mp4`}
              />
            )}
          </video>
        </div>
      </div>
    );
  }
}
