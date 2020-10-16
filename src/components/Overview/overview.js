import React from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { Fade } from '@material-ui/core';
import NetworkHandler from '../../networkHandler';
import List from './list';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.goToEpisode = this.goToEpisode.bind(this);
    this.state = {
      arcs: [],
      episodes: [],
      showScrollLeftArrow: this.container.scrollLeft > 0,
      showScrollRightArrow: this.container.scrollLeft === 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    NetworkHandler.request(
      '/list_progress_episodes.php',
      null,
      (responseJson) => {
        this.setState({
          arcs: responseJson.arcs,
          episodes: responseJson.episodes,
        });
      },
    );
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll() {
    if (this.container.scrollLeft === 0) {
      this.setState((prevState) => ({
        ...prevState,
        showScrollLeftArrow: false,
        showScrollRightArrow: true,
      }));
    } else if (
      this.container.scrollLeft + this.container.offsetWidth >=
      this.container.scrollWidth
    ) {
      this.setState((prevState) => ({
        ...prevState,
        showScrollLeftArrow: true,
        showScrollRightArrow: false,
      }));
    } else if (
      this.container.scrollLeft + this.container.offsetWidth <
        this.container.scrollWidth &&
      this.container.scrollLeft + this.container.offsetWidth > 0
    ) {
      this.setState((prevState) => ({
        ...prevState,
        showScrollLeftArrow: true,
        showScrollRightArrow: true,
      }));
    }
  }

  scrollLeft() {
    this.container.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.container.scrollTo({
      left: this.container.scrollWidth,
      behavior: 'smooth',
    });
  }

  goToEpisode(episodeId) {
    this.props.history.push(`/?episode=${episodeId}`);
  }

  render() {
    return (
      <main className="overview-content">
        <div
          ref={(ref) => {
            this.container = ref;
          }}
          className="card progress-container"
        >
          {this.state.arcs.map((i) => (
            <List
              arc={i}
              user={this.state.user}
              image={`assets/arc_${i.id}.png`}
              cards={this.state.episodes.filter((j) => j.arc_id === i.id)}
              key={`arc${i.id}`}
              onClickCard={(episode) => this.goToEpisode(episode.id)}
            />
          ))}
          <div className="nav-arrow left" onClick={this.scrollLeft}>
            <Fade in={this.state.showScrollLeftArrow}>
              <ArrowBackIos />
            </Fade>
          </div>
          <div className="nav-arrow right" onClick={this.scrollRight}>
            <Fade in={this.state.showScrollRightArrow}>
              <ArrowForwardIos />
            </Fade>
          </div>
        </div>
      </main>
    );
  }
}
