import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../component/CompoentLoading/';
import { ConnectedRouter } from 'react-router-redux';
import moment from '../../common/moment';
import { message } from 'antd';

let _window = {};
if (process.env.NODE_ENV === 'development') {
  _window = window;
} else {
  _window = global;
}
_window.moment = moment;
_window._ = require('lodash');
_window.message = message;
// import routesConfig from './routes';
const APP = Loadable({
  loader: () => import(/* webpackChunkName: 'App' */'../../component/App/index.jsx'),
  loading: Loading,
});
const Login = Loadable({
  loader: () => import(/* webpackChunkName: 'Login' */'../../component/Login/index.jsx'),
  loading: Loading,
});
const NoFound = Loadable({
  loader: () => import(/* webpackChunkName: 'NoFound' */'../../component/NoFound/index.jsx'),
  loading: Loading,
});
const Routers = ({ history }) => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path='/404' exact component={NoFound} />
      <Route path='/login' exact component={Login} />
      <Route path='/console' component={APP} />
      <Redirect to="/404" />
    </Switch>
  </ConnectedRouter>
)

export default Routers;