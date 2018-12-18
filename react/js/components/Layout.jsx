import React from "react";

export default class Layout extends React.Component {
	render() {
		return (
			<div className="layout-container">
				<div className="topnav bottom-shadow">
					<a href="/"><img className="logo" src="/assets/Logo.png" /></a>
					<a className="link text-link" href="/about">About</a>
					<a className="link text-link" href="/donate">Donate</a>
					<a className="link" href="/#/Progress">Progress</a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="https://discordapp.com/invite/WHpTJdP"><img src="/assets/discord.svg" /></a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681"><img src="/assets/arlongpark.svg" /></a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&amp;ithint=file%2cxlsx&amp;app=Excel&amp;authkey=!ACgbEWtkXaBEMC0"><img src="/assets/excel.svg" /></a>
				</div>
				<div className="main-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
