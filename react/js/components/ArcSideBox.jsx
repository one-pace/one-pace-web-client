import React from "react";

export default class ArcSideBox extends React.Component {
	render() {
		const {arc, children} = this.props;
		const title = arc.title;
		const magnet = arc.torrent ? arc.torrent.magnet : null;
		const torrentLink = arc.torrent ? "/torrents/" + arc.torrent.torrent_name : null;
		const subtitle = (arc.chapters ? "Chapter " : "") + arc.chapters + (arc.episodes ? "\n" + "Episode " + arc.episodes : "");
		return (
			<div className={"arc-side-box" + (this.props.isSelected ? " selected" : "")}>
				<div className="arc-header">
					<div onClick={this.props.onClick} className="arc-header-container">
						<img className="arc-img" src={"/assets/arc_" + arc.id + ".png"} />
						<div className="arc-info">
							<div className="arc-title">{title}</div>
							<div className="arc-subtitle">{subtitle}</div>
						</div>
					</div>
					<div className="arc-links">
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
				</div>
				{this.props.isSelected &&
				<div className="arc-body">
					{children}
				</div>
				}
			</div>
		);
	}
}
