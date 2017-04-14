import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {viewMediaDetail} from '../../actions';
import {reduxForm} from 'redux-form'
import {Quill} from 'react-quill';
import {change} from 'redux-form';
/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class Excel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.chooseExcel = this.chooseExcel.bind(this);
    this.onExcelLoad = this.onExcelLoad.bind(this);
  }

  closeMediaPopup() {
    let {dispatch} =this.props;
    dispatch(viewMediaDetail({
      viewing: false
    }))
  }

  onExcelLoad({target:excel}) {
    let {dispatch} = this.props;
    dispatch(change('excelDetail', 'width', excel.offsetWidth));
    dispatch(change('excelDetail', 'height', excel.offsetHeight));
  }

  chooseExcel() {
    let {dispatch, currentRichText, media} = this.props;
    let range = currentRichText.selection;
    // currentRichText.quillJs.insertEmbed(range.index, 'excel', {
    //   src: media.path,
    //   width: 300
    // }, Quill.sources.USER);
    // dispatch(viewMediaDetail({
    //   viewing: false
    // }));
  }

  render() {
    let {intl, media, initialValues} =this.props;
    return (
      <div className="audio-detail clearfix">
        {media &&
        <div>
          <div className="clearfix">
            <div className="audio-panel  pull-left">
              <div className="center-block-panel">
                <a href={media.path} download>Download File To Preview</a>
              </div>
            </div>
          </div>
          <div>
            <FlatButton className="margin-right15px"
                        label="Cancel"
                        primary={true}
                        onTouchTap={this.closeMediaPopup}
            />
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.chooseExcel()}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

Excel.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Excel = reduxForm({
  form: 'excelDetail',
})(injectI18N(Excel));

const mapStateToProp = (state) => {
  let {viewDetailMedia} = state.mm;
  let data = (viewDetailMedia && viewDetailMedia.data) ? viewDetailMedia.data : {};
  return ({
    initialValues: {
      title: data.name,
      alt: data.name,
      width: 0,
      height: 0
    },
    excelDetailForm: state.form.excelDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Excel = connect(mapStateToProp)(Excel);
export default Excel;