/**
 * Created by Peter Hoang Nguyen on 4/4/2017.
 */
import {connect} from 'react-redux';
const userLocalStorageKey = "user";
import React from 'react'
class User extends React.Component {
    constructor(props) {
        super(props);
        this.info = this.props.userInfo;
        if(!this.info) {
            this.info = JSON.parse(localStorage.getItem(process.env.REACT_APP_USER_LOCAL_STORAGE_KEY)) || {};
        }
    }
    render() {
        return false;
    }

}

const mapPropToState = (state) => {
    let userInfo = state.user.info;
    localStorage.setItem(process.env.REACT_APP_USER_LOCAL_STORAGE_KEY, JSON.toString(userInfo));
    return {
        userInfo:userInfo
    }
}
export default connect(mapPropToState)(User);