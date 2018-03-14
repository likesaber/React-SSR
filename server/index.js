require('./ignore.js')();
require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'env', 'react', 'stage-0'],
  plugins: ["react-loadable/babel", 'syntax-dynamic-import', "dynamic-import-node"]
})
const app = require('./app.js').default,
  clientRouter = require('./clientRouter.js').default,
  port = process.env.port || 3002,
  staticCache = require("koa-static-cache"),
  path = require('path'),
  cors = require('koa2-cors'),
  Loadable = require('react-loadable');
app.use(cors());
app.use(clientRouter);
app.use(staticCache(path.resolve(__dirname, '../dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip: true
}));
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
Loadable.preloadAll().then(() => {
  console.log('启动成功');
  app.listen(port)
}).catch((error) => {
  console.error('启动失败', error);
})


