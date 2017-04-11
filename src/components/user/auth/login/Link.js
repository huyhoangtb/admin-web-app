/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import LoginForm from 'components/user/auth/login/Login';
import RegisterForm from 'components/user/auth/register/Register';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {activeLoginTab, openLoginDialog} from './LoginActions';
import DialogNoHeader from 'components/forms/elements/custom-popup/DialogNoHeader';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class LoginLink extends React.Component {
    constructor(props) {
        super(props);
        this.openLoginPopup = this.openLoginPopup.bind(this);
    }

    componentWillMount() {
        let {dispatch} =this.props;
        dispatch(activeLoginTab())
    }

    openLoginPopup() {
        let {dispatch} = this.props;
        dispatch(openLoginDialog());
    }

    render() {
        let {intl} = this.props;
        let label = t1(intl, "Login");
        return (
            <a href="#" onClick={this.openLoginPopup} alt={label}> {label}</a>
        );
    }
}


const populateStateToProps = (state) => {
    let isLoginTabActivated = state.user.isLoginTabActivated;
    return {
        isLoginTabActivated: isLoginTabActivated
    }
};

LoginLink.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect(populateStateToProps)(injectI18N(LoginLink));