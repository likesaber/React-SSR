import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from '../CompoentLoading/';

const Exam = Loadable({
    loader: () => import(/* webpackChunkName: 'Exam-List' */'./ExamHome/index.jsx'),
    loading: Loading,
});
const ExamInfo = Loadable({
    loader: () => import(/* webpackChunkName: 'Exam-Info' */'./ExamInfo/index.jsx'),
    loading: Loading,
});

export default class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/list`} exact component={Exam} />
                <Route path={`${this.props.match.path}/info`} exact component={ExamInfo} />
                <Redirect to="/404" />
            </Switch>
        );
    }
}