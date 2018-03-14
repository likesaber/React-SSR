import configureStore from './configureStore';
import createApp from './createApp';
// import moment from '../common/moment';
// import { message } from 'antd';
// if (process.env.NODE_ENV === 'development') {
//   window.message = message;
//   window.moment = moment;
// } else {
//   global.window = global.window || {};
//   global.doc = global.doc || {};
//   global.document = global.document || {};
//   global.message = message;
//   global.moment = moment;
// }
// import routesConfig from './router/routes';
//暴露给后端渲染用
export default {
  configureStore,
  createApp,
  // routesConfig
}