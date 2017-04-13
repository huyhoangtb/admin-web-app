/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import LoginForm from 'components/user/auth/login/Login';
import {injectI18N, t1} from "i18n";
import Dialog from 'material-ui/Dialog';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class LoginLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.openLoginPopup = this.openLoginPopup.bind(this);
    this.closeLoginPopup = this.closeLoginPopup.bind(this);
  }

  openLoginPopup() {
    this.setState({open: true});
  }

  closeLoginPopup() {
    this.setState({open: false});
  }

  render() {
    let {intl} = this.props;
    let label = t1(intl, "Login");
    return (
      <div>
        <a href="#" onClick={this.openLoginPopup} alt={label}> {label}</a>
        <Dialog
          bodyClassName="login-modal-content"
          modal={true}
          open={this.state.open}>
          <a className="close-popup" href="#" onClick={this.closeLoginPopup} alt={close}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </a>
          <LoginForm/>
        </Dialog>
      </div>
    );
  }
}
export default (injectI18N(LoginLink));