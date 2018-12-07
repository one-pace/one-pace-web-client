import React, { Component } from "react";
import LocalStorageUtils from "../LocalStorageUtils";

export default class Side extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"isMinimized": LocalStorageUtils.getSidebarToggled()
		};
	}
	toggleMinimize = e => {
		e.preventDefault();
		LocalStorageUtils.setSidebarToggled(!this.state.isMinimized);
		this.setState({ "isMinimized": !this.state.isMinimized });
	}
	render() {
		return <div className={"side" + (this.state.isMinimized ? " minimized" : "")}>
			<div className="toggler" onClick={this.toggleMinimize}></div>
			{!this.state.isMinimized&&
			<div className="side-content">
				<h2>Links</h2>
				<ul>
					<li><a target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681">Arlong Park Forums Thread</a></li>
					<li><a target="_blank" rel="noopener noreferrer" href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&amp;ithint=file%2cxlsx&amp;app=Excel&amp;authkey=!ACgbEWtkXaBEMC0">One Pace Excel Chart</a></li>
					<li><a target="_blank" rel="noopener noreferrer" href="http://onepiecetracklist.com">One Piece Track List</a></li>
				</ul>
				<hr />
				<center>
					<iframe src="https://discordapp.com/widget?id=229653982530764800&amp;theme=dark" frameBorder="0" width="95%" height="70%"></iframe>
				</center>
			</div>
			}
		</div>;
	}
}
