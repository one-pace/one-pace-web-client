import React from "react";
import NetworkHandler from "../NetworkHandler";
import LocalStorageUtils from "../LocalStorageUtils";
import ArcSideBox from "./ArcSideBox";
import EpisodeSideBox from "./EpisodeSideBox";

export default class Watch extends React.Component {
	state = {
		"selectedArc": null,
		"selectedEpisode": null,
		"episodes": [],
		"arcs": []
	}

	componentDidMount() {
		NetworkHandler.request("/get_streams.php", null, (response) => {
			const { arcs, episodes } = response;
			let selectedArc = null;
			let selectedEpisode = null;
			const selectedEpisodeId = this.props.location.query.episode || LocalStorageUtils.getWatchSelectedEpisodeId();
			const selectedArcId = LocalStorageUtils.getWatchSelectedArcId();
			if (selectedEpisodeId) {
				[selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId || i.crc32 == selectedEpisodeId);
			}
			if (!selectedEpisode && selectedArcId) {
				[selectedArc] = arcs.filter((i) => i.id == selectedArcId);
			}
			if (!selectedArc && selectedEpisode) {
				[selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId);
			}
			LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);
			LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
			this.setState({ selectedArc, selectedEpisode, arcs, episodes });
		});
	}
	changeArc = (selectedArc) => {
		if (this.state.selectedArc && selectedArc.id == this.state.selectedArc.id) {
			selectedArc = null;
		}
		LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
		LocalStorageUtils.setWatchSelectedEpisodeId(null);
		this.setState({ "selectedArc": selectedArc, "selectedEpisode": null }, () => {
			this.videoRef.load();
		});
	}
	changeEpisode = (selectedEpisode) => {
		if (this.state.selectedEpisode && selectedEpisode.id == this.state.selectedEpisode.id) {
			selectedEpisode = null;
		}
		LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);
		this.setState({ selectedEpisode }, () => {
			this.videoRef.load();
			this.videoRef.play();
		});
	}
	nav = (dir) => {
		const episodes = this.state.episodes.filter((i) => i.isReleased);
		for (let i = 0; i < episodes.length; i++) {
			const episode = episodes[i];
			if (episode.id === this.state.selectedEpisode.id) {
				if (!((dir == "prev" && i == 0) || (dir == "next" && i >= episodes.length - 1))) {
					const otherEpisode = episodes[dir == "prev" ? i - 1 : i + 1];
					this.changeEpisode(otherEpisode.id);
				}
				break;
			}
		}
	}

	episodeBox = episode => {
		const isSelected = this.state.selectedEpisode && episode.id == this.state.selectedEpisode.id;
		const title = episode.part ? "Episode " + episode.part.toString().padStart(2, "0") : episode.title;
		const subtitle = (episode.chapters ? "Chapters: " + episode.chapters : "") + (episode.episodes ? " / Episodes: " + episode.episodes : "");
		const isReleased = episode.isReleased;
		const magnet = episode.torrent ? episode.torrent.magnet : null;
		const torrentLink = episode.torrent ? "/torrents/" + episode.torrent.torrent_name : null;
		return <EpisodeSideBox
			onClick={() => this.changeEpisode(episode)}
			onStopVideo={() => this.props.onStopVideo()}
			key={episode.id}
			isSelected={isSelected}
			isReleased={isReleased}
			title={title}
			subtitle={subtitle}
			magnet={magnet}
			torrentLink={torrentLink}
		/>;
	}

	arcEpisodes = arc => this.state.episodes.filter(i => i.arcId == arc.id);

	arcBox = arc => {
		const isSelected = this.state.selectedArc && arc.id == this.state.selectedArc.id;
		const subtitle = (arc.chapters ? "Chapter " : "") + arc.chapters + (arc.episodes ? "\n" + "Episode " + arc.episodes : "");
		const arcEpisodes = isSelected ? this.arcEpisodes(arc) : [];
		const img = "/assets/arc_" + arc.id + ".png";
		const magnet = arc.torrent ? arc.torrent.magnet : null;
		const torrentLink = arc.torrent ? "/torrents/" + arc.torrent.torrent_name : null;
		return <ArcSideBox
			onStopVideo={() => this.stopVideo()}
			onClick={() => this.changeArc(arc)}
			key={arc.id}
			title={arc.title}
			subtitle={subtitle}
			img={img}
			magnet={magnet}
			torrentLink={torrentLink}
			isSelected={isSelected}
		>
			<div className="episodes">
				{arcEpisodes.map(episode => this.episodeBox(episode))}
			</div>
		</ArcSideBox>;
	}

	stopVideo = () => this.videoRef.pause();

	render() {
		return (
			<div className="watch">
				<div className="arcs noselect">
					{this.state.arcs.map(arc => this.arcBox(arc))}
				</div>
				<div className="video-container">
					<video ref={(i) => this.videoRef = i} className="video-player" controls poster="/assets/logo-poster.png">
						{this.state.selectedEpisode != null &&
							<source type="video/mp4" src={"https://onepace.net/streams/" + this.state.selectedEpisode.crc32 + ".mp4"} />
						}
					</video>
				</div>
			</div>
		);
	}
}
