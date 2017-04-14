/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import Media from './Media';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import {openMediaManagerDialog} from './actions';
import DialogHeader from 'components/forms/elements/custom-popup/DialogHeader';
import ImageDetail from './views/details/ImageDetail';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
const customContentStyle = {
  width: '60%',
  maxWidth: 'none',
};


class MediaPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {openDetail: false};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);

  }

  closeMediaPopup() {
    let {dispatch} =this.props;
    dispatch(openMediaManagerDialog(false))
  }


  render() {
    let {
      intl,
      openMediaDialog,
      dispatch,
      isViewing
    } =this.props;
    let label = t1(intl, "Media manager");
    return (
      <div>
        <a href="#" onClick={() => {
          dispatch(openMediaManagerDialog(true))
        }} alt={label}> {label}</a>
        <DialogHeader
          closeOn={this.closeMediaPopup}
          modal={true}
          contentStyle={customContentStyle}
          className="ui-media-popup"
          bodyClassName="dialog-content-padding0"
          onRequestClose={this.closeMediaPopup}
          autoScrollBodyContent={false}
          title={t1(intl, "Media manager")}
          open={openMediaDialog}>
          {
            !isViewing ?
              <Media/>
              :
              <ImageDetail/>
          }
        </DialogHeader>
      </div>
    );
  }
}


const populateStateToProps = (state) => {
  let isLoginTabActivated = state.user.isLoginTabActivated;
  return {
    isLoginTabActivated: isLoginTabActivated,
    openMediaDialog: state.mm.openMediaDialog,
    isViewing: state.mm.isViewing,

  }
};
MediaPopup.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default connect(populateStateToProps)(injectI18N(MediaPopup));