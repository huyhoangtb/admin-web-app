/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
// import {FormattedMessage} from 'react-intl';
import {Route, Link} from 'react-router-dom';
import Login from 'components/user/auth/login/Login';
import LoginLink from 'components/user/auth/login/Link';
import Register from 'components/user/auth/register/Register';
import MediaPopup from 'components/media/MediaPopup';
import Test from 'components/Test';
import QuillComponent from 'components/test/QuillComponent';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
          
    }

    render() {
        let {intl} =this.props;
        return (
            <div>
                <LoginLink/>
                <MediaPopup/>
                <QuillComponent/>

                <Test/>
                <ul>
                    <li>
                        <Link to="/public">
                            {/*<FormattedMessage*/}
                                {/*id="app.en"*/}
                            {/*/>*/}{t1(intl, 'public')}
                            {t1(intl, 'public')}
                        </Link>

                    </li>
                    <li><Link to="/login">{t1(intl, 'protected_page')}</Link></li>
                    <li><Link to="/contact-us">Contact Page</Link></li>
                </ul>
                <Route path="/public" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/contact-us" component={Login}/>
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(injectI18N(App));