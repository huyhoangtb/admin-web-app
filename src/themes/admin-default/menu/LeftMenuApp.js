/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import ScrollArea from 'react-scrollbar';
import {Link} from 'react-router-dom';
import UserLeftMenuItem from './UserLeftMenuItem';
/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class LeftMenuApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {intl, scrollStyle, scrollSpeed} =this.props;

    return (
      <ScrollArea
        style={scrollStyle}
        speed={scrollSpeed}
        smoothScrolling={true}>
        <div className="ui-left-menu-body" style={{height: '1000px'}}>
          <UserLeftMenuItem/>
          <div className="ui-left-menu-list">
            <div className="menu-header menu-panel">
              Chức năng
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }
}

LeftMenuApp.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(injectI18N(LeftMenuApp));