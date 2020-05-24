import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Torrents from './torrents';
import About from './about';
import Layout from './layout';
import { Overview } from './Overview';
import '../index.scss';
import '../index.html';
import '../images/favicon.ico';
import 'typeface-roboto';

require.context('../images', false, /arc_\d+\.png$/);

ReactDOM.render(
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Torrents} />
        <Route path={['/about', '/about.html']} component={About} />
        <Route path={['/overview', '/overview.html']} component={Overview} />
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('reactentry'),
);
