/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
}
  from 'material-ui/Table';
import ReactScrollbar from 'react-scrollbar-js';
import Node from "../common/Node";
import {setMediaMenuContextState} from "../actions";
import NewFolder from "./NewFolder";
import  MediaContextMenu from '../controls/ContextMenu';
/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 04/04/2017
 **/
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openMediaContextMenu = this.openMediaContextMenu.bind(this);
  }

  openMediaContextMenu(event, row) {
    // This prevents ghost click.
    let {dispatch} = this.props;
    event.preventDefault();
    this.setState({
      mediaNode: row,
      anchorEl: event.currentTarget,
    });
    dispatch(setMediaMenuContextState(true));
  };


  render() {
    let {
      intl,
      mediaDB,
      isAddingFolder,
      onCreateFolderAction,
      onOpenFolder,
      onGoToBackFolder,
      onViewDetailFile
    } = this.props;
    let name = t1(intl, "name");
    let size = t1(intl, "size");
    let type = t1(intl, "type");
    let items = (mediaDB && mediaDB.data) ? mediaDB.data : [];
    const myScrollbar = {
      width: '100%',
      height: 400,
    };
    return (
      <div>
        <ReactScrollbar style={myScrollbar}>
        <div className="should-have-a-children scroll-me">
        <Table
          selectable={true}
          multiSelectable={true}>

          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn className="mm-list-row-file-name"
                                 tooltip="The ID">{name}</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">{size}</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">{type}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={true}
            showRowHover={true}
            stripedRows={true}>

                <TableRow selectable={false} className={isAddingFolder ? '' : "hidden"}>
                  <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                    <NewFolder onCreateFolderAction={onCreateFolderAction}/>
                  </TableHeaderColumn>
                </TableRow>
                {items.map((row, index) => (
                  <TableRow key={index} selected={row.selected}>
                    <TableRowColumn className="mm-list-row-file-name" onDoubleClick={() => {
                      onOpenFolder(row);
                      onViewDetailFile(row);
                    }}>
                      <div className="menu-context" onContextMenu={(event) => {
                        this.openMediaContextMenu(event, row);
                      }}>
                                    <span className="mm-file-icon">
                                         <i className={Node.generateNodeIconClass(row)} aria-hidden="true"/>
                                    </span>

                        <span className="mm-file-name">
                                        {row.name}
                                    </span>
                      </div>
                    </TableRowColumn>
                    <TableRowColumn onContextMenu={(event) => {
                      this.openMediaContextMenu(event, row);
                    }}>{row.size}</TableRowColumn>
                    <TableRowColumn onContextMenu={(event) => {
                      this.openMediaContextMenu(event, row);
                    }}>{row.type}</TableRowColumn>
                  </TableRow>
                ))}

          </TableBody>
        </Table>

        <MediaContextMenu mediaNode={this.state.mediaNode}
                          onOpenFolder={onOpenFolder}
                          onGoToBackFolder={onGoToBackFolder}
                          anchorEl={this.state.anchorEl}/>
          </div>
          </ReactScrollbar>
      </div>

    );
  }
}

ListItem.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const mapStateToProp = (state) => {
  return {
    isAddingFolder: state.mm.isAddingFolder,
    mediaDB: state.mm.mediaDB
  }
}
export default connect(mapStateToProp)(injectI18N(ListItem));