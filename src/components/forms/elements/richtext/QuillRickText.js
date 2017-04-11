import React from 'react';
import {Field} from 'redux-form';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/react-quill.min';
import {ImageResize} from './quill-lib/ImageResize';

import {connect} from 'react-redux';
import {openMediaManagerDialog, viewMediaDetail, pushQuillJS, Parchment} from 'components/media/MediaActions';

// Quill.register({
//     'modules/imageResize': ImageResize
// });
const container = [
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    [{'direction': 'rtl'}],                         // text direction
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['clean']                                         // remove formatting button
];

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', , 'direction', 'color', 'background', 'font','align', 'clean',
];
let modules = {
    toolbar: {
        container: container,
        handlers: {
            'image': (value) => {
                // props.openMediaManagerDialog();
            },
            'left': (value) => {
                console.log(value);
            }
        }
    },
    history: {
        delay: 1000,
        maxStack: 50,
        userOnly: false
    },
    // imageImport: true,
    imageResize: {
        displaySize: true
    }
};

class QuillComponent extends React.Component {
    constructor(props) {
        super(props);
        this.initModules = this.initModules.bind(this);
        this.state = {};
    }

    initModules() {
        let that = this;
        modules.toolbar.handlers.image = function (value) {
            let quill = this.quill;
            that.props.openMediaManagerDialog();
            that.props.pushQuillJSAction(quill, quill.getSelection());
        }
        Quill.register('modules/imageResize', ImageResize);
        return modules;
    }

    componentDidMount() {

    }

    render() {
        let selectorId = this.props.selectorId ? this.props.selectorId : 'quill';
        let className = this.props.className ? this.props.className : '';
        className += selectorId;
        selectorId = '.' + selectorId;
        return (
            <ReactQuill {...this.props}
                        theme='snow'
                        modules={this.initModules()}
                        formats={formats}

                        bounds={selectorId}
                        className={className}/>
        );
    }
}

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class QuillRickText extends React.Component {
    constructor(pops) {
        super(pops);
        this.state = {};
    }

    render() {
        return (
            <Field component={QuillComponent} {...this.props}  />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openMediaManagerDialog: () => {
            dispatch(openMediaManagerDialog(true));
            // dispatch(viewMediaDetail({
            //     viewing: true,
            //     data: {}
            // }))
        },
        pushQuillJSAction: (quill, selection) => {
            dispatch(pushQuillJS(quill, selection));
        }
    }
}

const populateStateToProps = (state) => {
    return {
        openMediaDialog: state.mm.openMediaDialog
    }
};


export default connect(populateStateToProps, mapDispatchToProps)(QuillRickText);
