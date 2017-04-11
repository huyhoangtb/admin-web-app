import React from 'react';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import GridItem from './GridItem';
import {onMMShowAddFolderBox, viewMediaDetail} from "../MediaActions";
import DialogHeader from 'components/forms/elements/custom-popup/DialogHeader';
const customContentStyle = {
    width: '90%',
    maxWidth: 'none',
};

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 04/04/2017
 **/
class ListMedia extends React.Component {
    constructor(props) {
        super(props);
        this.onCreateFolderAction = this.onCreateFolderAction.bind(this);
        this.onViewDetailFile = this.onViewDetailFile.bind(this);
    }

    onCreateFolderAction(event) {
        let {dispatch} =this.props;
        var keyCode = event.which || event.keyCode;
        if(keyCode === 27) {
            dispatch(onMMShowAddFolderBox(false))
        }
        if(keyCode === 13) {
            dispatch(onMMShowAddFolderBox(false))
        }
    }

    onViewDetailFile(items) {

        let type = items['type'];
        if (type && type === 'dir') {
            return;
        }
        let {dispatch} = this.props;

        dispatch(viewMediaDetail({
            viewing: true,
            data: items
        }))

    }

    render() {
        let {listView, onOpenFolder, onGoToBackFolder} =this.props;
        let listViewClass = listView ? 'list-view' : 'grid-view';

        let actionList = {
            onCreateFolderAction: this.onCreateFolderAction,
            onGoToBackFolder: onGoToBackFolder,
            openMediaMenuContext: this.openMediaMenuContext,
            onOpenFolder:onOpenFolder,
            onViewDetailFile: this.onViewDetailFile
        }

        return (
            <div className={listViewClass}>
                {
                    listView ?
                        <ListItem {...actionList} />
                        :
                        <GridItem {...actionList} />
                }

            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        listView: state.mm.listView
    }
}
ListMedia.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProp)(ListMedia);