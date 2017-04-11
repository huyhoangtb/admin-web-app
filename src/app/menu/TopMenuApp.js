/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import '../stylesheet.css';
import {Link} from 'react-router-dom';
import 'material-icons/css/material-icons.min.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class TopMenuApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        let {intl} =this.props;

        return (
            <div className="top-app-menu clearfix">
                <div className="pull-left top-left-menu">
                    <ul className="menu-panel">
                        <li className="item">
                            <Link  to="/login">
                                <i className="mi mi-menu mi-24"/>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="pull-right top-right-menu">
                    <ul className="menu-panel">
                        <li className="item">
                            <Link to="/login">
                                <i className="icon mi mi-settings"/>
                                <span>{t1(intl, 'item1')}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect()(injectI18N(TopMenuApp));