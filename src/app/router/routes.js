import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../component/CompoentLoading/';
const path = require("path");

const APP = Loadable({
  loader: () => import(/* webpackChunkName: 'App' */'../../component/App/index.jsx'),
  loading: Loading,
  delay: 1000
});
const NoFound = Loadable({
  loader: () => import(/* webpackChunkName: 'NoFound' */'../../component/NoFound/index.jsx'),
  loading: Loading,
  delay: 1000
});
const routesConfig = [{
  path: '/',
  component: APP
}];

export default routesConfig;




