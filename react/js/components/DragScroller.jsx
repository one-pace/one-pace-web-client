import React from 'react';

export default class DragScroller extends React.Component {
	state = { isScrolling: false };

	componentWillUpdate = (nextProps, nextState) => {
		if (this.state.isScrolling !== nextState.isScrolling) {
			this.toggleScrolling(nextState.isScrolling);
		}
	};

	toggleScrolling = (isEnable) => {
		if (isEnable) {
			window.addEventListener('mousemove', this.onMouseMove);
			window.addEventListener('mouseup', this.onMouseUp);
		} else {
			window.removeEventListener('mousemove', this.onMouseMove);
		}
	};

	onScroll = (event) => {
	};

	onMouseMove = (event) => {
		if (!event.clientX) {
			return;
		}
		const { clientX, scrollLeft} = this.state;
		const newScrollLeft = ((scrollLeft*-1) - clientX + event.clientX)*-1;
		this.scroller.scrollLeft = newScrollLeft;
		if(newScrollLeft > 0) {
			this.props.onScrolling();
		}
	};

	onMouseUp = () => {
		const { scrollLeft } = this.scroller;
		this.setState({ isScrolling: false, scrollLeft: scrollLeft, clientX: 0 });
		this.props.onStoppedScrolling();
		$('#scroller-thingy').kinetic('start', { velocity: 100 });
	};

	onMouseDown = (event) => {
		const { scrollLeft } = this.scroller;
		this.setState({ isScrolling: true, scrollLeft, clientX: event.clientX });
	};

	render() {
		return (
			<div
				id={"scroller-thingy"}
				className={this.props.className}
				ref={(i) => this.scroller = i}
				onScroll={this.onMouseMove}
				onMouseDownCapture={this.onMouseDown}
				onMouseUp={this.onMouseUp}
			>
				{this.props.children}
			</div>
		);
	}
}
