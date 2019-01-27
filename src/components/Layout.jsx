import React from "react"

export default class Layout extends React.Component {
	render() {
		return (
			<div className="layout-container">
				<div className="topnav bottom-shadow">
					<a href="/"><img className="logo" src={require("../images/Logo.png")} /></a>
					<a className="link text-link" href="/about">About</a>
					<a className="link text-link" href="/overview">Overview</a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="https://paypal.me/supportonepace"><img src={require("../images/paypal.svg")} /></a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="https://discordapp.com/invite/WHpTJdP"><img src={require("../images/discord.svg")} /></a>
					<a className="link link-right" target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681"><img src={require("../images/arlongpark.svg")} /></a>
					<span className="link link-right text-link">Currently looking for QCers!</span>
				</div>
				<div className="main-content">
					{this.props.children}
				</div>
			</div>
		)
	}
}
