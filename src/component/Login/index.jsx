import React, { Component } from "react";
export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        console.log('登录页信息:', this.props);
        return <div className='login-box'>
            这里是登录页面
        </div>;
    }
}
