import React from "react";

export default class About extends React.Component {
	componentDidMount() {
		document.title = "One Pace | About";
	}
	render() {
		return (
			<div className="about with-padding">
				<h2>What is One Pace?</h2>
				<p>
					One Pace is a project aiming to match the One Piece manga more accurately than Toei&apos;s anime adaptation.
					We cut out filler scenes, reaction shots, padded sequences, and re-order scenes to stay truer to Goda&apos;s manga.
				</p>
				<h2>Links</h2>
				<ul>
					<li>Discord: <a href="https://discordapp.com/invite/WHpTJdP" rel="noopener noreferrer" target="_blank">https://discordapp.com/invite/WHpTJdP</a></li>
					<li>Excel Page: <a href="https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&amp;ithint=file%2cxlsx&amp;app=Excel&amp;authkey=!ACgbEWtkXaBEMC0" rel="noopener noreferrer" target="_blank">https://onedrive.live.com/view.aspx?resid=2A9137DBF1112637!37021&amp;ithint=file%2cxlsx&amp;app=Excel&amp;authkey=!ACgbEWtkXaBEMC0</a></li>
				</ul>
				<h2>The Team</h2>
				<table>
					<tbody>
						<tr>
							<td>Galaxy 9000</td>
							<td>Editing</td>
						</tr>
						<tr>
							<td>Sewil</td>
							<td>Editing</td>
						</tr>
						<tr>
							<td>Feeso</td>
							<td>Editing</td>
						</tr>
						<tr>
							<td>Halee</td>
							<td>Music Master</td>
						</tr>
						<tr>
							<td>Datenshi</td>
							<td>Timing</td>
						</tr>
						<tr>
							<td>Grug</td>
							<td>Quality Assurance</td>
						</tr>
						<tr>
							<td>Pepperjack</td>
							<td>Quality Assurance</td>
						</tr>
						<tr>
							<td width="50%">Kaitou Yahiko</td>
							<td>Karaoke Effects</td>
						</tr>
						<tr>
							<td>Rael</td>
							<td>Editing</td>
						</tr>
						<tr>
							<td>Lance</td>
							<td>Timing</td>
						</tr>
						<tr>
							<td>Jojoejoe3</td>
							<td>Designer</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
