import React from "react"
import NetworkHandler from "../../NetworkHandler"
import List from "./List"
import { ArrowForwardIos } from "@material-ui/icons"
import { Fade } from "@material-ui/core"

export default class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "arcs": [],
      "episodes": [],
      "name": "",
      "password": "",
      "showScrollArrow": false
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true)
    NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
      this.setState({
        "arcs": responseJson.arcs, "episodes": responseJson.episodes
      })
    })
  }

  componentDidUpdate() {
    this.handleScroll()
  }

  handleScroll = () => {
    if (this.container.scrollLeft + this.container.offsetWidth < this.container.scrollWidth) {
      if (!this.state.showScrollArrow) {
        this.setState({ showScrollArrow: true })
      }
    } else {
      if (this.state.showScrollArrow) {
        this.setState({ showScrollArrow: false })
      }
    }
  }

  scrollRight = () => {
    this.container.scrollTo({
      left: this.container.scrollWidth,
      behavior: "smooth"
    })
  }

  goToEpisode = episodeId => this.props.history.push(`/?episode=${episodeId}`)

  render() {
    return (
      <div ref={ref => this.container = ref} className="card progress-container">
        {
          this.state.arcs.map(i =>
            <List
              arc={i}
              user={this.state.user}
              image={"assets/arc_" + i.id + ".png"}
              cards={this.state.episodes.filter(j => j.arc_id == i.id)}
              key={"arc"+i.id}
              onClickCard={episode => this.goToEpisode(episode.id)}
            />
          )
        }
        <div className="nav-arrow" onClick={this.scrollRight}>
          <Fade in={this.state.showScrollArrow}>
            <ArrowForwardIos />
          </Fade>
        </div>
      </div>
    )
  }
}
