import React from "react";

export default class EpisodeSideBox extends React.Component {
	render() {
		const {episode, isSelected, onClick} = this.props;
		const isReleased = episode.isReleased;
		const torrentLink = episode.torrent ? "/torrents/" + episode.torrent.torrent_name : null;
		const title = episode.part ? "Episode " + episode.part.toString().padStart(2, "0") : episode.title;
		let subtitle = episode.chapters ? "Chapters: " + episode.chapters : "";
		subtitle += episode.episodes ? "\n" + "Episodes: " + episode.episodes : "";
		const magnet = episode.torrent ? episode.torrent.magnet : null;
		return (
			<div className={"episode-side-box" + (isSelected ? " selected" : "") + (isReleased ? " released" : "")}>
				<div className="episode-info" onClick={isReleased ? onClick : null}>
					<div className="episode-title">{title}</div>
					<div className="episode-subtitle">{subtitle}</div>
				</div>
				{(magnet || torrentLink) &&
				<div className="episode-links">
					{magnet &&
					<a className="torrent-link" href={magnet} onClick={()=>this.props.onStopVideo()}>
						<i className="fas fa-magnet" />
					</a>
					}
					{torrentLink &&
					<a className="torrent-link" href={torrentLink} onClick={()=>this.props.onStopVideo()}>
						<i className="fas fa-file-download" />
					</a>
					}
				</div>
				}
			</div>
		);
	}
}
