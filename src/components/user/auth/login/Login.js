import '../stylesheet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {reduxForm} from 'redux-form'
import  InputText from 'components/forms/elements/input-text';
import  CheckBox from 'components/forms/elements/check-box';
import AuthPanel from 'components/user/auth/AuthPanel';
import RaisedButton from 'material-ui/RaisedButton';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {activeRegisterTab} from "components/user/auth/register/RegisterActions";
import {activeLoginTab, loginSuccess} from './LoginActions';
import Request from "common/network/http/Request";
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
                    localStorage.setItem(process.env.REACT_APP_USER_LOCAL_STORAGE_KEY,
                        JSON.stringify(response.result));
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

                    <InputText fullWidth={true} name="lname" label={ t1(intl, 'Username')}/>
                    <InputText fullWidth={true} name="pass" label={ t1(intl, 'Password')}/>
                    <div className="remember-me-panel ">
                        <CheckBox labelStyle={{color: "#9d9d9d"}}
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
                        <div className="center-block tools">
                            <a href="#" className="another-login-icon facebook">
                                <i className="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="another-login-icon googleplus">
                                <i className="fa fa-google-plus" aria-hidden="true"></i>
                            </a>
                        </div>
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
