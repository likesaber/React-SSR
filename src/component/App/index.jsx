import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
import { bindActionCreators } from 'redux';
import { getUserInfo } from '../../actions/CommonAction.jsx';
import { Icon, Menu, message } from 'antd';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import NoFund from '../../component/NoFound/index.jsx';
import Loading from '../CompoentLoading/';

// _window.message = message;
const Exam = Loadable({
    loader: () => import(/* webpackChunkName: 'ExamRouter' */'../Exam/Router.jsx'),
    loading: Loading,
});
const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'Home' */'../Home/index.jsx'),
    loading: Loading,
});
const SubMenu = Menu.SubMenu;
const MenuList = [
    { icon: 'home', name: '工作台', path: '/console' },
    {
        icon: 'home', name: '考试', path: '/console/exam', child: [
            { name: '考试列表', path: '/list' },
            { name: '成绩列表', path: '/info' },
            { name: '回顾列表', path: '/huigu' }
        ]
    },
    { icon: 'home', name: '微信', path: '/console/wx' },
    { icon: 'home', name: '组织', path: '/console/tissue' },
    { icon: 'home', name: '报表', path: '/console/charts' },
    { icon: 'home', name: '财务', path: '/console/finance' },
    { icon: 'home', name: '系统', path: '/console/system' },
    { icon: 'home', name: '服务', path: '/console/service' }
];
class APP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            hide: false,
            load: true, // 是否请求完成
        };
    }
    componentDidMount() {
        this.props.dispatch(getUserInfo((data) => {
            this.setState({
                load: true
            });
        }));
    }
    // componentDidCatch(error, info) {
    //     this.setState({ hasError: true });
    // }
    hideMenu = () => {
        this.setState({
            hide: !this.state.hide
        });
    }
    selectMenu = ({ key }) => {
        // console.log('狗日的:', this.props.history);
        exam_history.push(key);
    }
    render() {
        const { location = {}, history, userInfo } = this.props;
        const { load } = this.state;
        if (!load || (load && !userInfo)) {
            return '登录中...';
        }
        return (
            <div className="main-content">
                <div className="head-box">这里是头部</div>
                <div className="content-box">
                    <div
                        className={`${
                            this.state.hide ? 'menu-hide' : 'menu-open'
                            } left-menu`}
                    >
                        <div className="menu-item" onClick={this.hideMenu}>
                            <Icon type={this.state.hide ? 'menu-unfold' : 'menu-fold'} />
                        </div>
                        <Menu
                            selectedKeys={[location.pathname || '']}
                            defaultOpenKeys={[location.pathname.substr(0, location.pathname.lastIndexOf('/'))]}
                            onSelect={this.selectMenu}
                            mode="inline"
                            theme="dark"
                            inlineCollapsed={this.state.hide}
                        >
                            {MenuList.map((item, i) => {
                                if (!item.child) {
                                    return (
                                        <Menu.Item key={item.path}>
                                            <Icon type={item.icon} />
                                            <span>{item.name}</span>
                                        </Menu.Item>
                                    );
                                }
                                return (
                                    <SubMenu key={item.path} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                        {item.child.map((child, j) => (
                                            <Menu.Item key={item.path + child.path}>{child.name}</Menu.Item>
                                        ))}
                                    </SubMenu>
                                );
                            })}
                        </Menu>
                        {/* <div className="menu-item" onClick={this.hideMenu}>
                            <Icon type="left-circle-o" />
                        </div>
                        {MenuList.map((item, i) => {
                            return (
                                <Link to={item.path} key={i}  >
                                    <div className="menu-item">
                                        <span className='item-icon'><Icon type={item.icon} /></span>
                                        {item.name}
                                    </div>
                                </Link>
                            );
                        })} */}

                    </div>
                    <div className="right-content">
                        <Switch>
                            <Route path={`${this.props.match.path}/`} exact component={Home} />
                            <Route path={`${this.props.match.path}/exam`} component={Exam} />
                            <Redirect to="/404" />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps)(APP);
