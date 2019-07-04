import React from 'react'
import Card from './Card'

export default class List extends React.Component {
  render() {
    const { arc, image, cards, user, onClickCard } = this.props
    const { released, title, episodes, chapters } = arc
    return (
      <div className='list'>
        <div className={'header' + (!released ? ' unreleased' : '')}>
          <div>
            {title}
          </div>
          <div style={{ color: released ? 'rgb(100,100,100)' : 'rgb(200,200,200)', fontWeight: 'normal', fontSize: 12 }}>
            {!released && <div style={{ fontStyle: 'italic' }}>Unreleased</div>}
            {chapters && <div>Chapters: {chapters}</div>}
            {episodes && <div>Episodes: {episodes}</div>}
          </div>
        </div>
        <div className={'cards' + (!released ? ' unreleased' : '')}>
          <Card img={image} />
          {cards.map(episode => {
            return <Card
              user={user}
              onView={() => onClickCard(episode)}
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
