import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "babel-polyfill"
import Watch from "./Watch"
import About from "./About"
import Layout from "./Layout"
import Overview from "./Overview/Overview"
import "../index.scss"
import "../index.html"
import "../images/favicon.ico"
require.context("../images", false, /arc_\d+\.png$/)

ReactDOM.render(<Router>
	<Route
		render={() => (
			<Layout>
				<Route exact path="/" component={Watch} />
				<Route name="about" path="/about" component={About} />
				<Route name="overview" path="/overview" component={Overview} />
			</Layout>
		)}
	/>
</Router>, document.getElementById("reactentry"))
