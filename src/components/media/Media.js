/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import "./stylesheet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {injectI18N, t1} from "i18n";
import MediaControl from "./controls/TopControls";
import MediaLeftMenu from "./controls/RootFolderList";
import ListMedia from "./views/ListMediaContainer";
import Dropzone from "react-dropzone";
import {mediaListRootURL, mediaListURL, mediaUploadURL} from './DefinedUrl';
import {onMMDataLoaded, setMediaMenuContextState} from "./actions";
import {connect} from 'react-redux';
import Node from './common/Node';
import axios from 'axios';
import Request from "common/network/http/Request";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 03/04/2017
 **/
class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropStyle: {
        display: "none"
      }
    };
    this.onDrop = this.onDrop.bind(this);
    this.onUploadMediaStart = this.onUploadMediaStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.onOpenFolder = this.onOpenFolder.bind(this);
    this.goToBackFolder = this.goToBackFolder.bind(this);
  }

  getInitialState() {
    return {
      files: []
    };
  }

  componentDidMount() {
    let {dispatch, mediaDB} = this.props;
    mediaDB = mediaDB || {};

    Request.get(mediaListRootURL).then(response => {
      mediaDB.roots = Node.processRootList(response.result);
      mediaDB.roots = mediaDB.roots || [];

      if (mediaDB.roots.length > 0) {
        mediaDB.currentNode = mediaDB.roots[0];
        mediaDB.currentRoot = mediaDB.roots[0];
        mediaDB.presentId = 0;
        Request.get(mediaListURL, mediaDB.roots[0]).then(response => {
          let mediaList = Node.processNodeList(response.result);
          mediaDB.data = mediaList;
          dispatch(onMMDataLoaded(Object.assign({}, mediaDB)));
        });
      } else {
        dispatch(onMMDataLoaded(Object.assign({}, mediaDB)));
      }
    });
  }

  onOpenFolder(folder, isRoot) {
    if (folder['type'] && folder['type'] !== 'dir') {
      return;
    }
    let {mediaDB, dispatch} = this.props;
    if (isRoot) {
      mediaDB.currentRoot = Object.assign({}, folder);
    }
    dispatch(onMMDataLoaded(Object.assign({}, mediaDB)));

    let params = {
      root: mediaDB.currentRoot['id'],
      dir: folder['relative_path_from_root'],
    }
    Request.get(mediaListURL, params).then(response => {
      let mediaList = Node.processNodeList(response.result);
      mediaDB.data = mediaList;
      folder = Object.assign({}, folder, {'children': mediaList});
      mediaDB.currentNode = Object.assign({}, folder);
      Object.assign({}, mediaDB.currentNode, {children: mediaList});
      dispatch(onMMDataLoaded(Object.assign({}, mediaDB)));
    });
  }

  goToBackFolder(event) {
    let {dispatch, mediaDB} =this.props;
    let currentNode = mediaDB.currentNode;
    let relativePathFromRoot = currentNode['relative_path_from_root']
    if (!relativePathFromRoot) {
      return;
    }
    while (relativePathFromRoot[relativePathFromRoot.length - 1] === '/') {
      relativePathFromRoot = relativePathFromRoot.substring(0, relativePathFromRoot.length - 2)
    }
    relativePathFromRoot = relativePathFromRoot.substring(0, relativePathFromRoot.lastIndexOf('/'));
    console.log(relativePathFromRoot);
    this.onOpenFolder({'relative_path_from_root': relativePathFromRoot});
    dispatch(setMediaMenuContextState(false))
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles
    });
    let {mediaDB} =this.props;
    Request.post(mediaUploadURL, {
      'root': mediaDB.currentRoot['id'],
      'dir': mediaDB.currentNode['relative_path_from_root'],
        'files': acceptedFiles
    }).then(response => {
      this.onOpenFolder(mediaDB.currentNode);
    })
  }

  onUploadMediaStart() {
    this.dropzone.open();
  }

  onDragOver(event) {
    this.setState({
      dropStyle: {
        height: "200px",
        borderWidth: "2px",
        borderColor: "rgb(102, 102, 102)",
        borderStyle: "dashed",
        borderRadius: "5px",
        display: "block",
        width: "100%"
      }
    })
  }

  dragLeave(event) {
    this.setState({
      dropStyle: {
        "display": "none"
      }
    })
  }

  render() {
    let {intl} =this.props;
    return (
      <div className="ui-media-panel ">
        <div className="ui-control-panel clearfix">
          <div className="pull-left">
            <MediaControl
              onGoToBackFolder={this.goToBackFolder}
              uploadMedia={this.onUploadMediaStart}/>
          </div>
          <div className="pull-right">
            <div className="ui-search">
              <input/>
              <i className="mi mi-search" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="ui-media-content clearfix">
          <div className="ui-content-left pull-left">
            <MediaLeftMenu onOpenFolder={this.onOpenFolder}/>
          </div>

          <div className="ui-content-right">
            <div className="ui-content-panel" onDragOver={this.onDragOver} onMouseLeave={this.dragLeave}>
              <ListMedia onGoToBackFolder={this.goToBackFolder} onOpenFolder={this.onOpenFolder}/>

              <Dropzone style={this.state.dropStyle} onDragLeave={this.dragLeave}
                        ref={(node) => {
                          this.dropzone = node;
                        }} onDrop={this.onDrop}>
                {t1(intl, "drop_your_files_here")}
              </Dropzone>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    listView: state.mm.listView,
    mediaDB: state.mm.mediaDB
  }
}
Media.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProp)(injectI18N(Media));