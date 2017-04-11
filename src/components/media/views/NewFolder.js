/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import  InputText from 'components/forms/elements/input-text';
import {onMMShowAddFolderBox, onMMDataLoaded} from "../MediaActions";
import {mediaCreateFolderURL} from '../MediaDefinedUrl';
import Node from "../common/Node";
import Request from "common/network/http/Request";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/04/2017
 **/
class NewFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onCreateFolderAction = this.onCreateFolderAction.bind(this);
    }
    onCreateFolderAction(event) {
        let {dispatch, mediaDB, mmFolderForm} =this.props;
        let {currentRoot, currentNode, data} = mediaDB;
        var keyCode = event.which || event.keyCode;
        if(keyCode === 27) {
            dispatch(onMMShowAddFolderBox(false))
            return;
        }
        if(keyCode !== 13) {
            return;
        }

        let relativePathFromRoot = currentNode.relative_path_from_root ? currentNode.relative_path_from_root : '/';
        let folderName = mmFolderForm.values.folderName;
        let params = {
            newDirName: folderName,
            root: currentRoot.id,
            dir : relativePathFromRoot
        };
        let newNode = Node.newFolderNode(currentNode, folderName);
        dispatch(onMMShowAddFolderBox(false));
        Request.get(mediaCreateFolderURL, params).then(response => {
            if(response.success) {
                let presentData = data || [];
                presentData = [newNode].concat(presentData);
                let newCurrentNode = Object.assign({}, currentNode, {children: presentData});
                dispatch(onMMDataLoaded(Object.assign({}, mediaDB, {data: presentData, currentNode: newCurrentNode})));
            }
        });


    }
    render() {
        let {intl} =this.props;

        return (
            <InputText fullWidth={true}
                       onKeyUp={this.onCreateFolderAction}
                       hintText={t1(intl, 'new_folder')}
                       floatingLabelText=""
                       name="folderName" label={ t1(intl, 'new_folder')}/>
        );
    }
}

NewFolder.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
const mapStateToProp = (state) => {
    return {
        listView: state.mm.listView,
        mediaDB: state.mm.mediaDB,
        mmFolderForm: state.form.mmFolderForm
    }
}

export default connect(mapStateToProp)(reduxForm({
    form: 'mmFolderForm',
})(injectI18N(NewFolder)));
