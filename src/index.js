import React from "react";
import { hydrate, render } from "react-dom";
import createHistory from 'history/createBrowserHistory';
import Loadable from "react-loadable";
import getHistory from './common/History.jsx';
import app from "./app/index.js";
import './styles/common.less';
const initialState = window && window.__INITIAL_STATE__;
let { configureStore, createApp } = app;
let store = configureStore(initialState);
let history = getHistory(createHistory());
global.exam_history = history;
const renderApp = () => {
    let application = createApp({ store, history });
    hydrate(application, document.getElementById("root"));
};

window.main = () => {
    Loadable.preloadReady().then(() => {
        renderApp();
    });
};

if (process.env.NODE_ENV === "development") {
    if (module.hot) {
        module.hot.accept("./reducers/index.jsx", () => {
            let newReducer = require("./reducers/index.jsx");
            store.replaceReducer(newReducer);
            /*import('./store/reducers/index.js').then(({default:module})=>{
        store.replaceReducer(module)
      })*/
        });
        module.hot.accept("./app/index.js", () => {
            let { createApp } = require("./app/index.js");
            let newReducer = require("./reducers/index.jsx");
            store.replaceReducer(newReducer);
            let application = createApp({ store, history });
            hydrate(application, document.getElementById("root"));
            /*import('./app/index.js').then(({default:module})=>{
        let {createApp}=module;
        import('./store/reducers/index.js').then(({default:module})=>{
          store.replaceReducer(module)
          let application=createApp({store,history});
          render(application,document.getElementById('root'));
        })
      })*/
        });
    }
}
