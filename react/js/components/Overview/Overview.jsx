import React from "react"
import NetworkHandler from "../../NetworkHandler"
import List from "./List"

export default class Overview extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"arcs": [],
			"episodes": []
		}
	}
	componentDidMount() {
		NetworkHandler.request("/list_progress_episodes.php", null, (responseJson) => {
			this.setState({
				"arcs": responseJson.arcs, "episodes": responseJson.episodes
			})
		})
	}
	render() {
		return (
			<div className="card progress-container">
				{
					this.state.arcs.map(i =>
						<List
							arc={i}
							image={"/assets/arc_" + i.id + ".png"}
							cards={this.state.episodes.filter(j => j.arc_id == i.id)}
							key={"arc"+i.id}
						/>
					)
				}
			</div>
		)
	}
}
