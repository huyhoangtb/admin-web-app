/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {switchToListView, switchToGridView} from "../MediaActions";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 03/04/2017
 **/
class ViewTypeSwitcher extends React.Component {

    render() {
        let {listView, dispatch} =this.props;
        return (
            <li className="item" onClick={() => {
                if (listView) {
                    dispatch(switchToGridView())
                    return;
                }
                dispatch(switchToListView())
            }}>
                <a href="#"><i className={listView ? "fa fa-list-ul" : "fa fa-th"}  aria-hidden="true"></i></a>
            </li>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        listView: state.mm.listView
    }
}

export default connect(mapStateToProp)(ViewTypeSwitcher);