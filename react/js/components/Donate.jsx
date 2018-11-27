import React from "react";

export default class SupportUs extends React.Component {
	componentDidMount() {
		document.title = "One Pace | Donate";
	}
	render() {
		return (
			<div className="with-padding">
				Send Bitcoin: <a href="bitcoin:39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN" target="_blank">39GmGwQAzdRYXGxmyA9XBXoTSGt1ZXTqeN</a>
				<br />
				Mine Monero:
				<br />
				<div className="coinhive-miner" style={{"width": "256px", "height": "310px"}} data-key="9PPz4KKzTq540iNk6je2ZAmDzOyEY4jX">
					<em>Loading...</em>
				</div>
			</div>
		);
	}
}
