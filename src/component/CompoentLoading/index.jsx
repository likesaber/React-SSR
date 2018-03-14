import React, { Component } from "react";
import { Spin } from 'antd';
import './index.less';
// export default class Loading extends Component {
//     constructor(props) {
//         super(props);
//     }
//     componentDidMount() {

//     }
//     render() {
//         return <div className='compoent-loading-spin' ><Spin /></div>;
//     }
// }

export default function Loading({ error, pastDelay }) {
    if (error) {
        return <div>组件加载错误...</div>;
    } else if (pastDelay) {
        return <div className='compoent-loading-spin' ><Spin /></div>;
    } else {
        return null;
    }
}