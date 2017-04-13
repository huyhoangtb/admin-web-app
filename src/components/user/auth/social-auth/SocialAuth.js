/**
 * Created by Peter Hoang Nguyen on 4/13/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 13/04/2017
 **/
class SocialAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
          
    }

    componentWillMount() {
        let {dispatch} = this.props;

    }

    render() {
        return (
          <div className="center-block tools">
            <a href="#" className="another-login-icon facebook">
              <i className="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#" className="another-login-icon googleplus">
              <i className="fa fa-google-plus" aria-hidden="true"></i>
            </a>
          </div>
        );
    }
}

SocialAuth.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(SocialAuth);