import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
}
    from 'redux'
import reducers from '../reducers/index.jsx'
import middleware from './middleware.jsx';

//redux 存放路由
let func = f => f;
if (process.env.NODE_ENV != 'production') {
    func = window.devToolsExtension();
}
var finalCreateStore = compose(
    applyMiddleware.apply(this, middleware), func
)(createStore);


export default finalCreateStore(reducers);
