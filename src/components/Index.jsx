import React from "react"
import ReactDOM from "react-dom"
import {
	Router,
	Route,
	IndexRoute
} from "react-router"
import "babel-polyfill"
import Watch from "./Watch"
import About from "./About"
import Layout from "./Layout"
import Overview from "./Overview/Overview"
import HttpsRedirect from "react-https-redirect"
import history from "../history"
import "../index.scss"
import "../index.html"
import "../images/favicon.ico"
require.context("../images", false, /arc_\d+\.png$/)

ReactDOM.render(
	<HttpsRedirect>
		<Layout>
			<Router history={history}>
				<Route path="/(?episode=:episode)">
					<IndexRoute component={Watch} />
					<Route name="about" path="/about" component={About} />
					<Route name="overview" path="/overview" component={Overview} />
				</Route>
			</Router>
		</Layout>
	</HttpsRedirect>, document.getElementById("reactentry")
)
