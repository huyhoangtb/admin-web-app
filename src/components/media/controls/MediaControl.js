/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import ControlItem from './ControlItem';
import {connect} from 'react-redux';
import {switchToListView, switchToGridView, onMMShowAddFolderBox} from "../MediaActions";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 03/04/2017
 **/
class MediaControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.addFolder = this.addFolder.bind(this);
    }

    addFolder() {
        let {dispatch,isAddingFolder} =this.props;
        if(isAddingFolder) {
            dispatch(onMMShowAddFolderBox(false));
        } else {
            dispatch(onMMShowAddFolderBox(true));
        }

    }

    render() {
        let {uploadMedia, dispatch, isAddingFolder, onGoToBackFolder} =this.props;

        return (
            <ul className="list">
                <ControlItem iconClass="mi mi-arrow-back mi-24" onAction={() =>{
                    onGoToBackFolder();
                }}/>
                <ControlItem iconClass="mi mi-file-upload mi-24" onAction={() => {
                    uploadMedia();
                }}/>
                <ControlItem iconClass="mi mi-file-download mi-24"/>
                <li className="item" onClick={this.addFolder}>
                    <a>
                                <span>
                                    <i className="mi mi-folder-open mi-24" aria-hidden="true"></i>
                                    <i className={isAddingFolder ? "mi mi-close plus" : "mi mi-add plus"} aria-hidden="true"></i>
                                </span>
                    </a>
                </li>
                <ControlItem iconClass="fa fa-pencil-square-o "/>
                <ControlItem iconClass="mi mi-delete mi-24"/>
                <ControlItem iconClass="mi mi-view-list mi-24" onAction={() => {
                    dispatch(switchToListView());
                }}/>
                <ControlItem iconClass="mi mi-view-comfy mi-24" onAction={() => {
                    dispatch(switchToGridView())
                }}/>
            </ul>
            // <ul className="list">
            //     <ControlItem iconClass="fa fa-refresh"/>
            //     <ControlItem iconClass="fa fa-cloud-upload" onAction={() => {
            //         uploadMedia();
            //     }}/>
            //     <ControlItem iconClass="fa fa-cloud-download"/>
            //     <li className="item" onClick={this.addFolder}>
            //         <a>
            //                     <span>
            //                         <i className="fa fa-folder-o" aria-hidden="true"></i>
            //                         <i className={isAddingFolder ? "fa fa-times plus" : "fa fa-plus plus"} aria-hidden="true"></i>
            //                     </span>
            //         </a>
            //     </li>
            //     <ControlItem iconClass="fa fa-pencil-square-o"/>
            //     <ControlItem iconClass="fa fa-trash"/>
            //     <ControlItem iconClass="fa fa-list-ul" onAction={() => {
            //         dispatch(switchToListView());
            //     }}/>
            //     <ControlItem iconClass="fa fa-th" onAction={() => {
            //         dispatch(switchToGridView())
            //     }}/>
            // </ul>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        listView: state.mm.listView,
        isAddingFolder: state.mm.isAddingFolder
    }
}
export default connect(mapStateToProp)(MediaControl);