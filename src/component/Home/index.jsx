import React, { Component } from "react";
import { connect } from "react-redux";
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
        return <div>
            工作台首页
        </div>;
    }
}
