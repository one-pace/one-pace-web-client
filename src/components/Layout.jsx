import React from "react"

export default class Layout extends React.Component {
	render() {
		return (
			<div className="layout-container">
				<div className="topnav bottom-shadow">
					<a href="/"><img className="logo" src={require("../images/Logo.png")} /></a>
					<a className="link text-link" href="/about">About</a>
					<a className="link text-link" href="/overview">Overview</a>
					<a className="link link-right" title="Donate BTC to 3Eq6edmVPo5yJ3UmRotT3hhzfUZYEziKMb" target="_blank" rel="noopener noreferrer" href="bitcoin:3Eq6edmVPo5yJ3UmRotT3hhzfUZYEziKMb?label=Donate%20to%20One%20Pace&amp;message=All%20donations%20go%20towards%20maintaining%20and%20improving%20the%20One%20Pace%20project."><img src={require("../images/btc.svg")} /></a>
					<a className="link link-right" title="Paypal" target="_blank" rel="noopener noreferrer" href="https://paypal.me/supportonepace"><img src={require("../images/paypal.svg")} /></a>
					<a className="link link-right" title="Discord" target="_blank" rel="noopener noreferrer" href="https://discordapp.com/invite/WHpTJdP"><img src={require("../images/discord.svg")} /></a>
					<a className="link link-right" title="Arlong Park Forums" target="_blank" rel="noopener noreferrer" href="http://forums.arlongpark.net/showthread.php?t=38681"><img src={require("../images/arlongpark.svg")} /></a>
				</div>
				<div className="main-content">
					{this.props.children}
				</div>
			</div>
		)
	}
}
