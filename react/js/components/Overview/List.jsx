import React from "react"
import Card from "./Card"

export default class List extends React.Component {
	render() {
		return (
			<div className="list">
				<div className={"header"}>{this.props.arc.title}</div>
				<div className="cards">
					<Card img={this.props.image} />
					{this.props.cards.map(episode => {
						return <Card
							key={episode.id}
							episode={episode}
							arc={this.props.arc}
							onClick={() => this.props.onClickCard(episode)}
						/>
					})}
				</div>
			</div>
		)
	}
}
