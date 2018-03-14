'use strict';
import React from 'react';
const IMG_SERVER = window.PUBLIC_SERVER_URL;

const reqWithContext = require.context('../../images', true, /\.(png|jpg|gif)$/);

export function getRealPath(src) {
    if (src) {
        if (src.startWith('http') ||
            src.startWith('/qm') ||
            src.startWith('/assets/')) {
            return src;
        } else if (src.startWith('/')) {
            return IMG_SERVER + src;
        } else {
            if (src.startWith('./')) {
                return reqWithContext(src);
            } else if (src.startWith('data:image') || src.startWith('blob:')) {
                return src;
            } else {
                return reqWithContext('./' + src);
            }
        }
    }
}
const ImgMap = {
    COURSE: './code_default.png',
    VIDEO: './video_lib.jpg',
    PRODUCT: './service-icon-4.png',
    USER: './OfflineScreen/user_default.png',
    NAV: './HomeSetting/nav_default.png',

    COURSE: './default_course.jpg',//课程默认图片
    VERTICAL: './course-default_460_230.jpg',
    HORIZONTAL: './course-default_230_480.jpg',
    SQUARE: '/images/course-default_460_480.jpg',
}
export default class Img extends React.Component {
    static propTypes = {
        src: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            src: props.src
        }
    }
    onError = () => {
        if (this.props.type) {
            this.setState({
                src: ImgMap[this.props.type]
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.src != this.props.src) {
            this.setState({
                src: nextProps.src
            });
        }
    }
    render() {
        let props = { ...this.props };
        let src = this.state.src;
        if (!src) { //firefox
            src = ImgMap[this.props.type]
        }
        delete props.preview;
        delete props.type;
        return (
            <img {...props}
                src={getRealPath(src)}
                onError={this.onError} />
        );
    }
}
