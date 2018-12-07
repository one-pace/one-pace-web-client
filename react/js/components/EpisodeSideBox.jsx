import React from "react";

export default class EpisodeSideBox extends React.Component {
	render() {
		const { isSelected, isReleased, title, subtitle, magnet, torrentLink } = this.props;
		return (
			<div className={"episode-side-box" + (isSelected ? " selected" : "") + (isReleased ? " released" : "")}>
				<div className="episode-info" onClick={isReleased ? this.props.onClick : null}>
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
