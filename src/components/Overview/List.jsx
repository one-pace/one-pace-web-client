import React from "react"
import Card from "./Card"

export default class List extends React.Component {
	render() {
		const { arc, image, cards, user, onClickCard } = this.props
		const { released, title } = arc
		return (
			<div className="list">
				<div className={"header" + (!released ? " unreleased" : "")}>
					{title}
					{!released ? " (TBA)" : ""}
				</div>
				<div className={"cards" + (!released ? " unreleased" : "")}>
					<Card img={image} />
					{cards.map(episode => {
						return <Card
							user={user}
							onView={()=>onClickCard(episode)}
							key={episode.id}
							episode={episode}
							arc={arc}
							onClick={() => onClickCard(episode)}
						/>
					})}
				</div>
			</div>
		)
	}
}
