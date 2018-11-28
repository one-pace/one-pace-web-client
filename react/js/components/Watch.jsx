import React from "react";
import Side from "./Side";
import NetworkHandler from "../NetworkHandler";
import LocalStorageUtils from "../LocalStorageUtils";
import ArcSideBox from "./ArcSideBox";
import EpisodeSideBox from "./EpisodeSideBox";
import DragScroller from "./DragScroller";

export default class Watch extends React.Component {
	state = {
		selectedArc: null,
		selectedEpisode: null,
		episodes: [],
		arcs: []
	}

	componentDidMount() {
		NetworkHandler.request("/get_streams.php", null, (response) => {
			const {arcs, episodes} = response;
			let selectedArc = null;
			let selectedEpisode = null;
			const selectedEpisodeId = this.props.location.query.episode || LocalStorageUtils.getWatchSelectedEpisodeId();
			const selectedArcId = LocalStorageUtils.getWatchSelectedArcId();
			if(selectedEpisodeId) {
				[selectedEpisode] = episodes.filter((i) => i.id == selectedEpisodeId || i.crc32 == selectedEpisodeId);
			}
			if(!selectedEpisode && selectedArcId) {
				[selectedArc] = arcs.filter((i) => i.id == selectedArcId);
			}
			if(!selectedArc && selectedEpisode) {
				[selectedArc] = arcs.filter((i) => i.id == selectedEpisode.arcId);
			}
			LocalStorageUtils.setWatchSelectedEpisodeId(selectedEpisode ? selectedEpisode.id : null);
			LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
			this.setState({ selectedArc, selectedEpisode, arcs, episodes }, () => {
				this.props.onSetState(this.state.selectedArc, this.state.selectedEpisode);
			});
		});
	}
	changeArc = (selectedArc) => {
		if(this.state.selectedArc && selectedArc.id == this.state.selectedArc.id) {
			selectedArc = null;
		}
		LocalStorageUtils.setWatchSelectedArcId(selectedArc ? selectedArc.id : null);
		LocalStorageUtils.setWatchSelectedEpisodeId(null);
		this.setState({ selectedArc: selectedArc, selectedEpisode: null }, () => {
			this.videoRef.load();
		});
	}
	changeEpisode = (selectedEpisode) => {
		if(this.state.selectedEpisode && selectedEpisode.id == this.state.selectedEpisode.id) {
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
	stopVideo = () => {
		this.videoRef.pause();
	}
	render() {
		const {isScrolling} = this.state; 
		return (
			<div className="watch">
				<Side />
				<div className="video-container">
					<DragScroller
						className="arcs noselect"
						onScrolling={() => !isScrolling && this.setState({isScrolling: true})}
						onStoppedScrolling={() => isScrolling && this.setState({isScrolling: false})}
					>
						{this.state.arcs.map(arc => {
							const isSelected = this.state.selectedArc != null && arc.id == this.state.selectedArc.id;
							const arcEpisodes = isSelected ? this.state.episodes.filter(episode => episode.arcId == arc.id) : [];
							const ref = isSelected ? (section) => { this.SelectedArcRef = section } : null;
						return <ArcSideBox
							onStopVideo={()=>this.stopVideo()}
							onClick={() => !isScrolling && this.changeArc(arc)}
							key={arc.id} arc={arc} isSelected={isSelected} ref={ref}>
							<div className="episodes">
								{arcEpisodes.map(episode => {
									return <EpisodeSideBox
										onClick={() => this.changeEpisode(episode)}
										onStopVideo={()=>this.props.onStopVideo()}
										key={episode.id} episode={episode}
										isSelected={this.state.selectedEpisode != null && episode.id == this.state.selectedEpisode.id}
									/>
								})}
							</div>
						</ArcSideBox>
						})}
					</DragScroller>
					<video ref={(i) => this.videoRef = i} className="video-player" controls poster="/assets/logo-poster.png">
					{ this.state.selectedEpisode != null &&
						<source type="video/mp4" src={"https://onepace.net/streams/" + this.state.selectedEpisode.crc32 + ".mp4"} />
					}
					</video>
				</div>
			</div>
		);
	}
}
