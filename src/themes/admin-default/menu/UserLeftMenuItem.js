/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {openLoginDialog} from 'components/user/auth/actions';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class UserLeftMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentsDidMount() {
    let {intl, userInfo} =this.props;
    if(!userInfo || !userInfo.token) {
      let {dispatch} =this.props;
      dispatch(openLoginDialog());
    }
  }

  render() {
    let {intl, userInfo} =this.props;
    return (
      <div className="user-info-panel menu-panel clearfix">
        <div className="user-avatar pull-left">
          <img src={userInfo.avatar}/>
        </div>
        <div className="user-action pull-left">
          <div className="full-name">{userInfo.name}</div>
          <div className="action clearfix">
            <div className="pull-left">
              <i className="status-active">
              </i>
              <span className="status-label">{t1(intl, "online")}</span>
            </div>
            <div className="pull-right">
              <Link className="user-config" to='/'>
                <i className="mi mi-settings"/>
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return {
    userInfo: state.user.info
  }
}

export default connect(mapStateToProp)(injectI18N(UserLeftMenuItem));