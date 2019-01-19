import React from "react"
import NetworkHandler from "../../NetworkHandler"
import List from "./List"
import history from "../../history"

export default class Overview extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"arcs": [],
			"episodes": [],
			"name": "",
			"password": "",
		}
	}
	componentDidMount() {
		NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
			this.setState({
				"arcs": responseJson.arcs, "episodes": responseJson.episodes
			})
		})
	}

	goToEpisode = episodeId => history.push(`/?episode=${episodeId}`)

	render() {
		return (
			<div className="card progress-container">
				{
					this.state.arcs.map(i =>
						<List
							arc={i}
							user={this.state.user}
							image={require("../../images/arc_" + i.id + ".png")}
							cards={this.state.episodes.filter(j => j.arc_id == i.id)}
							key={"arc"+i.id}
							onClickCard={episode => this.goToEpisode(episode.id)}
						/>
					)
				}
			</div>
		)
	}
}
