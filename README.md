# Exam_SSR
webpack+router4+按需加载+webpack-dev-server

开发环境使用webpack-dev-server做服务端，实现热加载，生产环境使用koa做后端，实现按需加载，页面渲染前加载数据
具体介绍可以查看 https://juejin.im/post/5a392018f265da431b6d5501

1. npm install
2. npm start 运行开发版环境


-------------------------------------------------

1. npm install
2. npm run build 生产环境编译 dist/client+dist/server
3. npm run server 运行koa
4. npm run dev:server 运行服务端渲染环境

# 项目使用注意
1. 使用history
    组件内可以使用this.props.history和exam_history(全局),两者一样
    非组件使用exam_history

2. 使用Ajax请求数据
    一律在componentDidMount生命周期函数内调

3. 不要在componentWillMount内使用一切浏览器对象，如window、document等(服务端没有这些对象)

4. 导入组件使用相对路径,如：import commonAction from '../action/...',相对当前定位;

5. moment、message、_ 三个对象可以全局使用

6. 路由(导入组件使用Loadable)：新建一级路由在 src/app/router/index.js 内加,如 /login,/console,/learner
   二级路由：如/console(控制台),新建一个容器组件(参考:src/component/App/index.jsx)，再在里面使用Switch组件添加子路由
   其中：exact属性:完全匹配当前路由;Loadable.delay:200(默认200ms),意思是加载时间大于200毫秒的展示loading过渡

7. 模块化：新写一个模块时(如Exam模块)，在component下新建文件夹，文件夹下写一个Router.jsx文件，里面存放当前模块所有路由，模块路由放在        src/app/router/index.js

8. 开发完成后，提交之前使用npm run dev:server 命令进入服务端渲染环境，测试功能正常后提交.



-------------------------------------------------
想了解更多可以看下 https://github.com/tzuser/ssr ，不同风格，同样的功能，也是用的 react16+router5+koa2
