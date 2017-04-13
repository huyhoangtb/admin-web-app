/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import iconMapping from 'common/icons/IconMapping';
/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 03/04/2017
 **/
class RootFolderList extends React.Component {

  render() {
    let {mediaDB, onOpenFolder} =this.props;
    return (
      <ul className="ui-folder-default">
        {
          mediaDB && mediaDB.roots &&
          mediaDB.roots.map((root, key) =>
            (
              <li key={key} onClick={() => {
                onOpenFolder(root, true);
              }}>
                <a href="#">
                  <i className={iconMapping.mapping(root.icon)} aria-hidden="true"></i>
                  <span>{root.name}</span>
                </a>
              </li>
            ))
        }

      </ul>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    listView: state.mm.listView,
    mediaDB: state.mm.mediaDB
  }
}
RootFolderList.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProp)(RootFolderList);