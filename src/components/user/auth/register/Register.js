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
import {activeLoginTab} from 'components/user/auth/login/LoginActions';
import {activeRegisterTab} from "components/user/auth/register/RegisterActions";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.doRegister = this.doRegister.bind(this);
    }

    componentWillMount() {
        let {dispatch} =this.props;
        dispatch(activeRegisterTab())
    }


    doRegister() {
        let {registerForm} =this.props;
        // let data = Object.assign({},registerForm.values, {submit : 1});
        // Fetch.post("/user/register", data);
        fetch("http://vlms.dev/user/register?submit=1&&name="+registerForm.values.name+"&pass="+registerForm.values.pass+"&mail="+registerForm.values.email )
        // Request.post("/user/register", registerForm.values);
        // Request.post("/user/login", loginForm.values)
    }

    render() {
        let {intl, dispatch} =this.props;
        return (

            <AuthPanel>
                <div className="ui-auth-panel ui-register">
                    <div className="ui-auth-header">
                        <a onClick={() => {
                            dispatch(activeLoginTab());
                        }}>
                            { t1(intl, 'Login')}

                        </a>
                        <span>/</span>
                        <a className="active">
                            { t1(intl, 'Register') }
                        </a>
                    </div>
                    <InputText fullWidth={true} name="name" label={ t1(intl, 'fullname')}/>

                    <InputText fullWidth={true} name="email" label={ t1(intl, 'email')}/>

                    <InputText fullWidth={true} name="pass" label={ t1(intl, 'Password')}/>

                    <div className="terms-and-conditions clearfix">
                        <div className="pull-left">
                            <CheckBox labelStyle={{color: "#9d9d9d"}}
                                      iconStyle={{fill: "#9d9d9d"}}
                                      style={{display: "inline-block", width: "auto"}}
                                      name="remember_me"/>
                        </div>
                        <div className="pull-left text-link">
                            { t1(intl, 'agree_with')}
                            <a href="#"> { t1(intl, 'terms')}</a>
                            { " & " }
                            <a href="#"> { t1(intl, 'conditions')}</a>
                        </div>
                    </div>

                    <div className="ui-button-group center-block">
                        <RaisedButton label={t1(intl, "Register")} onClick={this.doRegister} className="button" primary={true}/>
                    </div>
                    <div className="another-register-tools-panel">
                        <div className="header clearfix">
                            <div className="center-block line-over">
                                <span>{ t1(intl, 'or_register_with') }</span>
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

const populateStateToProps = (state) => {
    return {
        registerForm: state.form.register
    }
};

Register.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

Register = reduxForm({
    form: 'register',  // a unique identifier for this form
})(injectI18N(Register))

export default connect(populateStateToProps)(Register);
