/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import LoginForm from 'components/user/auth/login/Login';
import RegisterForm from 'components/user/auth/register/Register';
import {connect} from 'react-redux';
import {openLoginDialog, activeLoginTab, closeLoginDialog} from '../actions';
import DialogNoHeader from 'components/forms/elements/custom-popup/DialogNoHeader';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.openLoginPopup = this.openLoginPopup.bind(this);
    this.closeLoginPopup = this.closeLoginPopup.bind(this);
  }

  componentWillMount() {
    let {dispatch} =this.props;
    dispatch(activeLoginTab())
  }

  openLoginPopup() {
    let {dispatch} = this.props;
    dispatch(openLoginDialog());
  }

  closeLoginPopup() {
    let {dispatch} = this.props;
    dispatch(closeLoginDialog());
  }

  render() {
    let {openLoginDialog, isLoginTabActivated} =this.props;

    return (
      <DialogNoHeader
        modal={true}
        closeOn={this.closeLoginPopup}
        open={openLoginDialog}>
        {
          isLoginTabActivated ? <LoginForm/> : <RegisterForm/>

        }
      </DialogNoHeader>
    );
  }
}


const populateStateToProps = (state) => {
  let openLoginDialog = state.user.openLoginDialog;
  let isLoginTabActivated = state.user.isLoginTabActivated;
  return {
    openLoginDialog: openLoginDialog,
    isLoginTabActivated: isLoginTabActivated
  }
};

LoginDialog.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect(populateStateToProps)(LoginDialog);