import { combineReducers } from 'redux';
import common from './CommonReducers.jsx';
import { routerReducer } from 'react-router-redux'
const reducerList = {
  router: routerReducer,
  common,
};
export default combineReducers(reducerList)
