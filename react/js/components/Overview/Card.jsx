import React from "react"
import Moment from "moment"

export default class Card extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"arc": props.arc,
			"episode": props.episode
		}
	}
	renderProgressCard = (episode, arc) => this.props.img &&
		<div className="progress-card" onClick={this.props.onClick}>
			<img className="list-image" src={this.props.img} />
		</div> ||
		<div className={"progress-card title"} onClick={this.props.onClick}>
			<div className="text">{episode.part ? arc.title + " " + episode.part.toString().padStart(2, "0") : episode.title}{(episode.status && episode.in_progress ? " (" + episode.status + ")" : "")}</div>
			{ episode.title && episode.part && <div className="status">“{episode.title}”</div> }
			<div className="status">{episode.released_date && Moment(episode.released_date, "YYYY-MM-DD HH:mm:ss").format("MMMM D, YYYY") || "TBA"}</div>
			{
				episode.chapters && episode.episodes && <div className="status">Ch. {episode.chapters} / Ep. {episode.episodes}</div>
				|| episode.chapters && <div className="status">Chapter {episode.chapters}</div>
				|| episode.episodes && <div className="status">Episode {episode.episodes}</div>
			}
		</div>
	render() {
		const {episode, arc} = this.state
		return this.renderProgressCard(episode, arc)
	}
}
