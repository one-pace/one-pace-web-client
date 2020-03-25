import React from 'react'
import ReactDOM from 'react-dom'
import { StaticRouter as Router, Route, Switch } from 'react-router-dom'
import 'babel-polyfill'
import Watch from './watch'
import About from './about'
import Layout from './layout'
import { Overview } from './Overview'
import '../index.scss'
import '../index.html'
import '../images/favicon.ico'
import 'typeface-roboto'
require.context('../images', false, /arc_\d+\.png$/)

ReactDOM.render((
  <Router>
    <Layout>
      <Switch>
        <Route exact path='/' component={Watch} />
        <Route name='about' path='/about' component={About} />
        <Route name='overview' path='/overview' component={Overview} />
      </Switch>
    </Layout>
  </Router>
), document.getElementById('reactentry'))
