import '../stylesheet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {reduxForm} from 'redux-form';
import  {TextField, Checkbox} from 'components/forms/elements';
import AuthPanel from 'components/user/auth/AuthPanel';
import RaisedButton from 'material-ui/RaisedButton';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {activeLoginTab, loginSuccess, activeRegisterTab} from '../actions';
import Request from "common/network/http/Request";
import  SocialAuth from '../social-auth/SocialAuth';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.doLogin = this.doLogin.bind(this);
  }

  componentWillMount() {
    let {dispatch} =this.props;
    dispatch(activeLoginTab())
  }

  doLogin() {
    let {loginForm, dispatch} =this.props;
    Request.get("/user/login", loginForm.values,)
      .then(response => {
        if (response.success) {
          dispatch(loginSuccess(response.result));
        }
      });
  }

  render() {
    let {intl, dispatch} =this.props;
    return (

      <AuthPanel>
        <div className="ui-auth-panel">
          <div className="ui-auth-header">
            <a className="active" href="#">
              { t1(intl, 'Login')}

            </a>
            <span>/</span>
            <a onClick={() => {
              dispatch(activeRegisterTab());
            }}>

              { t1(intl, 'Register') }
            </a>
          </div>

          <TextField fullWidth={true} name="lname"
                     floatingLabelText={ t1(intl, 'Username')}
                     hintText={ t1(intl, 'Username')}/>
          <TextField fullWidth={true} name="pass"
                     floatingLabelText={ t1(intl, 'Password')}
                     hintText={ t1(intl, 'Password')}/>
          <div className="remember-me-panel ">
            <Checkbox labelStyle={{color: "#9d9d9d"}}
                      iconStyle={{fill: "#9d9d9d"}}
                      name="remember_me" label={ t1(intl, 'remember_me')}/>
          </div>

          <div className="ui-button-group clearfix center-block">
            <div className="pull-left login-button-panel">
              <RaisedButton onClick={this.doLogin} label={t1(intl, "Đăng nhập")} className="button"
                            primary={true}/>
            </div>
            <div className="pull-right">
              <a className="forgot-password"> { t1(intl, 'Forgot password?') }</a>
            </div>

          </div>
          <div className="another-login-tools-panel">
            <div className="header clearfix">
              <div className="center-block line-over">
                <span>{ t1(intl, 'or_login_with') }</span>
              </div>
            </div>
            <SocialAuth/>
          </div>

        </div>
      </AuthPanel>

    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
const populateStateToProps = (state) => {
  let userInfo = state.user.info;
  return {
    loginForm: state.form.login,
    userInfo: userInfo
  }
};

export default connect(populateStateToProps)(reduxForm({
  form: 'login',  // a unique identifier for this form
})(injectI18N(Login)));
