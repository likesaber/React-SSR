import React, { Component } from "react";
import { connect } from "react-redux";
import { getExamList } from '../../../actions/ExamAction.jsx';
import './index.less';
class ExamHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load: false,
            data: {
                list: []
            }
        };
    }
    componentDidMount() {

    }
    render() {
        const data = this.state.data;
        return (
            <div className='examlist'>
                这里是考试列表
                {data.list.map(item => item)}
            </div>
        );
    }
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(ExamHome);
