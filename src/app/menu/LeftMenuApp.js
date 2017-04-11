/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';

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

    componentWillMount() {
        let {dispatch} = this.props;

    }

    render() {
        let {intl} =this.props;
        let msg = t1(intl, "msg");

        return (
            <div>
                {msg}
            </div>
        );
    }
}

LeftMenuApp.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(injectI18N(LeftMenuApp));