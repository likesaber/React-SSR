import React, { Component } from "react";
import './index.less';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                list: []
            }
        };
    }
    componentDidMount() {

    }
    render() {
        console.log('不存在页面:', this.props);
        return <div className='notfound-box'>
            <div className="table-noContent">
                <div className="showTip">
                    <i className="anticon anticon-qm-weixin2" />
                    <div>页面不存在</div>
                </div>
            </div>
        </div>;
    }
}
