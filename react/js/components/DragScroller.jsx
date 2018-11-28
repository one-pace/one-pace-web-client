import React from 'react';
import ReactDOM from "react-dom";
import Scroll, { Link, Element , Events, animateScroll, scrollSpy, scroller } from 'react-scroll';

export default class DragScroller extends React.Component {
	state = { isScrolling: false };

	componentDidMount = () => {
		Events.scrollEvent.register('begin', function(to, element) {
			console.log("begin", arguments);
		});
	 
		Events.scrollEvent.register('end', function(to, element) {
			console.log("end", arguments);
		});
		scrollSpy.update();
	};

	componentWillUnmount = () => {
		Events.scrollEvent.remove('begin');
		Events.scrollEvent.remove('end');
	};

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
		if (!event.clientX || !event.clientY) {
			return;
		}
		const { clientX, scrollLeft, scrollTop, clientY } = this.state;
		const newScrollLeft = ((scrollLeft*-1) - clientX + event.clientX)*-1;
		const newScrollTop = scrollTop - clientY + event.clientY;
		this.scroller.scrollLeft = newScrollLeft;
		this.scroller.scrollTop = newScrollTop;
		if(newScrollLeft + newScrollTop > 0) {
			this.props.onScrolling();
		}
	};

	onMouseUp = () => {
		const { scrollLeft, scrollTop } = this.scroller;
		this.setState({
			isScrolling: false,
			scrollLeft: scrollLeft, scrollTop: scrollTop,
			clientX: 0, clientY: 0
		});
		this.props.onStoppedScrolling();
	};

	onMouseDown = (event) => {
		const { scrollLeft, scrollTop } = this.scroller;
		this.setState({ isScrolling: true, scrollLeft, scrollTop, clientX: event.clientX, clientY: event.clientY });
	};

	render() {
		return (
			<div
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
