import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from '../../CompoentLoading/';
import './index.less';
export default class ExamInfo extends Component {
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
        return <div className='examinfo'>
            考试详情页{
                moment().format('YYYY-MM-DD HH:mm:ss')
            }
            <img src="../../../assets/img/1.jpg" />
        </div>;
    }
}
