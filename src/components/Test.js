/**
 * Created by Peter Hoang Nguyen on 4/5/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
// import  InputText from 'components/forms/elements/input-text';
import {reduxForm} from 'redux-form';
import RaisedButton from "material-ui/RaisedButton";

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 05/04/2017
 **/

let clientData = {
  grant_type: "password",
  username: "",
  password: "",
  client_id: "clientIdPassword"
};

clientData.encoded = btoa("clientIdPassword:secret");

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.testURL = this.testURL.bind(this);

  }

  testURL() {
    var xhr = new window.XMLHttpRequest()
    // let url = "http://localhost:8084/security/oauth/token?grant_type=password&scope=read+write&client_id=my-trusted-client&client_secret=secret&username=bill&password=abc123";
    let url = "http://localhost:8084/oauth/token?grant_type=password&scope=read+write&client_id=my-trusted-client&client_secret=secret&username=admin&password=nlntmttaum";
    // let url = "http://localhost:8084/security/oauth/token?grant_type=password&scope=read+write&client_id=my-trusted-client&client_secret=secret&username=mahesh&password=m123";
    xhr.open('POST', url);
    xhr.setRequestHeader("Authorization", "Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send({
      username: 'bill',
      password: 'abc123',
      grant_type: 'password'
    })

  }

  render() {
    let {intl} =this.props;
    return (
      <div>
        <form>
          {/*<InputText fullWidth={true} name="url" value="http://localhost:8084/security/oauth/token"*/}
                     {/*label={ t1(intl, 'Url')}/>*/}
          <RaisedButton onClick={this.testURL} label={t1(intl, "Test")} className="button"
                        primary={true}/>
          <div >
            {this.state.response}
          </div>
        </form>
      </div>
    );
  }
}

Test.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
const populateStateToProps = (state) => {
  let userInfo = state.user.info;
  return {
    testForm: state.form.test,
    userInfo: userInfo
  }
};

export default connect(populateStateToProps)(reduxForm({
  form: 'test',
})(injectI18N(Test)));