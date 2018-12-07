import React from "react";

export default class ArcSideBox extends React.Component {
	render() {
		const { title, subtitle, children, img, magnet, torrentLink, isSelected } = this.props;
		return (
			<div className={"arc-side-box" + (this.props.isSelected ? " selected" : "")}>
				<div className="arc-header">
					<div onClick={this.props.onClick} className="arc-header-container">
						<div className="arc-img" style={{"backgroundImage": "url(" + img + ")"}} />
						<div className="arc-info">
							<div className="arc-title">{title}</div>
							<div className="arc-subtitle">{subtitle}</div>
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
				</div>
				{isSelected &&
				<div className="arc-body">
					{children}
				</div>
				}
			</div>
		);
	}
}
