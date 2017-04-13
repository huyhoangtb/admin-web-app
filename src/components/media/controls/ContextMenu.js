/**
 * Created by Peter Hoang Nguyen on 4/7/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import {setMediaMenuContextState} from '../actions'
import '../stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 07/04/2017
 **/
class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack(event) {
    let {currentNode, openFolder, dispatch} =this.props;
    let relativePathFromRoot = currentNode['relative_path_from_root']
    if (!relativePathFromRoot) {
      return;
    }
    while (relativePathFromRoot[relativePathFromRoot.length - 1] === '/') {
      relativePathFromRoot = relativePathFromRoot.substring(0, relativePathFromRoot.length - 2)
    }
    relativePathFromRoot = relativePathFromRoot.substring(0, relativePathFromRoot.lastIndexOf('/'));
    console.log(relativePathFromRoot);
    openFolder({'relative_path_from_root': relativePathFromRoot});
    dispatch(setMediaMenuContextState(false))
  }

  render() {
    let {
      intl,
      anchorEl,
      mediaMenuContextState,
      mediaNode,
      onOpenFolder,
      dispatch,
      currentNode,
      onGoToBackFolder
    } = this.props;

    let isFolder = mediaNode && mediaNode.type && mediaNode.type.toLowerCase() === 'dir';
    let showBackControl = currentNode && currentNode.relative_path_from_root && currentNode.relative_path_from_root !== '/';
    return (
      <Popover
        open={mediaMenuContextState}
        anchorEl={anchorEl}
        className="mm-context-menu"
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={() => {
          dispatch(setMediaMenuContextState(false));
        }}
      >
        <Menu>
          {isFolder && <MenuItem primaryText={t1(intl, 'open_this_folder')} onTouchTap={() => {
            onOpenFolder(mediaNode);
            dispatch(setMediaMenuContextState(false));
          }
          }/>}

          {showBackControl && <MenuItem primaryText="Back to" onTouchTap={onGoToBackFolder}/>}
          {mediaNode && <MenuItem primaryText="Delete this item"/> }
          {mediaNode && <MenuItem primaryText="Edit"/> }
        </Menu>
      </Popover>
    );
  }
}

ContextMenu.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
let populateStateToProp = (state) => {
  return {
    mediaMenuContextState: state.mm.mediaMenuContextState,
    currentNode: state.mm.mediaDB.currentNode
  }
}
export default connect(populateStateToProp)(injectI18N(ContextMenu));