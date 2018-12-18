import React from "react"
import NetworkHandler from "../NetworkHandler"
import LocalStorageUtils from "../LocalStorageUtils"

export default class Watch extends React.Component {
	state = {
		"selectedArc": null,
		"selectedEpisode": null,
		"episodes": [],
		"arcs": []
	}

	componentDidMount() {
		NetworkHandler.request("/get_streams.php", null, response => {
			const { arcs, episodes } = response
			let selectedArc = null
			let selectedEpisode = null
			const selectedEpisodeId = this.props.location.query.episode || LocalStorageUtils.getWatchSelectedEpisodeId()
			const selectedArcId = LocalStorageUtils.getWatchSelectedArcId()
			if (selectedEpisodeId) {
				[selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId || i.crc32 == selectedEpisodeId)
			}
			if (!selectedEpisode && selectedArcId) {
				[selectedArc] = arcs.filter((i) => i.id == selectedArcId)
			}
			if (!selectedArc && selectedEpisode) {
				[selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId)
			}
			if (selectedArc && !selectedEpisode) {
				[selectedEpisode] = episodes.filter(i => i.arcId == selectedArc.id)
			}
			LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null)
			LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null)
			this.setState({ selectedArc, selectedEpisode, arcs, episodes })
		})
	}
	changeArc = selectedArc => {
		let selectedEpisode = null
		if (selectedArc) {
			[selectedEpisode] = this.state.episodes.filter(i => i.arcId == selectedArc.id)
		}
		LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null)
		LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null)
		this.setState({ "selectedArc": selectedArc, "selectedEpisode": selectedEpisode }, () => {
			this.videoRef.load()
		})
	}
	changeEpisode = selectedEpisode => {
		LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null)
		let selectedArc = this.state.selectedArc
		if (selectedEpisode && selectedArc && selectedEpisode.arcId != selectedArc.id) {
			[selectedArc] = this.state.arcs.filter(i => i.id == selectedEpisode.arcId)
			LocalStorageUtils.setWatchSelectedArcId(selectedArc.id)
		}
		this.setState({ selectedArc, selectedEpisode }, () => {
			this.videoRef.load()
			this.videoRef.play()
		})
	}

	nav = dir => {
		const episodes = this.state.episodes.filter((i) => i.isReleased)
		for (let i = 0; i < episodes.length; i++) {
			const episode = episodes[i]
			if (episode.id === this.state.selectedEpisode.id) {
				if (!((dir == "prev" && i == 0) || (dir == "next" && i >= episodes.length - 1))) {
					const otherEpisode = episodes[dir == "prev" ? i - 1 : i + 1]
					this.changeEpisode(otherEpisode)
				}
				break
			}
		}
	}

	stopVideo = () => this.videoRef.pause()

	torrentLink = torrentName => <a className="torrent-link" href={"/torrents/" + torrentName} onClick={() => this.stopVideo()}>
		<i className="fas fa-file-download" />
	</a>
	
	magnetLink = magnetURL => <a className="torrent-link" href={magnetURL} onClick={() => this.stopVideo()}>
		<i className="fas fa-magnet" />
	</a>

	render() {
		const { selectedArc, selectedEpisode, arcs, episodes } = this.state
		return (
			<div className="watch">
				<div className="watch-top"><center>
					<select
						className="arcs"
						value={selectedArc ? selectedArc.id : 0}
						onChange={(e) => {
							const arcId = e.target.value
							const [arc] = arcs.filter(i => i.id == arcId)
							this.changeArc(arc)
						}}
					>
						{
							arcs.map(arc => {
								let title = arc.chapters ? "(Chapter " + arc.chapters + ")" : ""
								title += (arc.title ? " " + arc.title : " Untitled") + (arc.chapters ? " Arc" : "")
								title += arc.released ? "" : " (Unreleased)"
								return <option disabled={!arc.released} key={"arc"+arc.id} value={arc.id}>{title}</option>
							})
						}
					</select>
					<select
						className="episodes"
						value={selectedEpisode ? selectedEpisode.id : 0}
						onChange={(e) => {
							const episodeId = e.target.value
							const [episode] = episodes.filter(i => i.id == episodeId)
							this.changeEpisode(episode)
						}}
					>
						{episodes.length > 0 && selectedArc &&
							episodes.filter((i) => i.arcId == selectedArc.id).map(episode => {
								const title = episode.part ? " " + selectedArc.title + " " + ("00" + episode.part.toString()).slice(-2) : episode.title ? " " + episode.title : ""
								return <option disabled={!episode.isReleased} key={"episode" + episode.id} value={episode.id}>{title}</option>
							})
						}
					</select>
					<span className="ep-nav" onClick={() => this.nav("prev")}>&nbsp; &laquo; &nbsp;</span>
					<span className="ep-nav" onClick={() => this.nav("next")}>&nbsp; &raquo; &nbsp;</span>
					{
						selectedEpisode && selectedEpisode.torrent && this.torrentLink(selectedEpisode.torrent.torrent_name) ||
						selectedArc && selectedArc.torrent && this.torrentLink(selectedArc.torrent.torrent_name)
					}
					{
						selectedEpisode && selectedEpisode.torrent && this.magnetLink(selectedEpisode.torrent.magnet) ||
						selectedArc && selectedArc.torrent && this.magnetLink(selectedArc.torrent.magnet)
					}
					{selectedEpisode && selectedEpisode.chapters && <span>Chapters: {selectedEpisode.chapters}</span>}
					{selectedEpisode && selectedEpisode.episodes && <span>&nbsp;/&nbsp;Episodes: {selectedEpisode.episodes}</span>}
				</center>
				</div>
				<div className="video-container">
					<video ref={(i) => this.videoRef = i} className="video-player" controls poster="/assets/logo-poster.png">
						{selectedEpisode &&
							<source type="video/mp4" src={"https://onepace.net/streams/" + selectedEpisode.crc32 + ".mp4"} />
						}
					</video>
				</div>
			</div>
		)
	}
}
