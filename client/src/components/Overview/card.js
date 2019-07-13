import React from 'react'
import Moment from 'moment'

export default class Card extends React.Component {
  constructor (props) {
    super(props)
    this.renderProgressCard = this.renderProgressCard.bind(this)
    this.state = {
      'arc': props.arc,
      'episode': props.episode
    }
  }

  renderProgressCard (episode, arc) {
    if (this.props.img) {
      return (
        <div className={'progress-card'} onClick={this.props.onClick}>
          <img className={'list-image'} src={this.props.img} />
        </div>
      )
    } else {
      const containerClassName = `progress-card title ${episode.in_progress ? 'unreleased' : ''}`
      const episodeTitle = episode.part ? `${arc.title} ${episode.part.toString().padStart(2, '0')}` : episode.title
      return (
        <div className={containerClassName} onClick={episode.in_progress ? null : this.props.onClick}>
          <div className='text'>
            {episodeTitle}
            {episode.in_progress ? ' (TBA)' : ''}
          </div>
          {episode.title && episode.part && (
            <div className='status'>“{episode.title}”</div>
          )}
          {!episode.in_progress && episode.released_date && (
            <div className='status'>
              {Moment(episode.released_date, 'YYYY-MM-DD HH:mm:ss').format('MMMM D, YYYY')}
            </div>
          )}
          {episode.chapters && episode.episodes && (
            <div className='status'>
              Ch. {episode.chapters} / Ep. {episode.episodes}
            </div>
          )}
          {episode.chapters && !episode.episodes && (
            <div className='status'>
              Chapter {episode.chapters}
            </div>
          )}
          {!episode.chapters && episode.episodes && (
            <div className='status'>
              Episode {episode.episodes}
            </div>
          )}
        </div>
      )
    }
  }

  render () {
    const { episode, arc } = this.state
    return this.renderProgressCard(episode, arc)
  }
}
