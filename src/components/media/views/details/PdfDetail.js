import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {viewMediaDetail} from '../../actions';
import ReactScrollbar from 'react-scrollbar-js';
import {reduxForm} from 'redux-form';
import {Quill} from 'react-quill';
import {change} from 'redux-form';
/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class Pdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.choosePdf = this.choosePdf.bind(this);
    this.onPdfLoad = this.onPdfLoad.bind(this);
  }

  closeMediaPopup() {
    let {dispatch} = this.props;
    dispatch(viewMediaDetail({
      viewing: false
    }))
  }

  onPdfLoad({target: pdf}) {
    let {dispatch} = this.props;
    dispatch(change('pdfDetail', 'width', pdf.offsetWidth));
    dispatch(change('pdfDetail', 'height', pdf.offsetHeight));
  }

  choosePdf() {
    let {dispatch, currentRichText, media} = this.props;
    // let range = currentRichText.selection;
    // currentRichText.quillJs.insertEmbed(range.index, 'pdf', {
    //   src: media.path,
    //   width: 300
    // }, Quill.sources.USER);
    // dispatch(viewMediaDetail({
    //   viewing: false
    // }));
  }

  render() {
    let {intl, media, initialValues} = this.props;
    const myScrollbar = {
      width: '100%',
      height: 'auto',
    };
    return (
      <div className="pdf-detail clearfix">
        {media &&
        <div>

          <div className="clearfix">
            <div className="pdf-panel  pull-left">
              <div className="center-block-panel">
                <ReactScrollbar style={myScrollbar}>
                  <div className="should-have-a-children scroll-me">
                    <iframe ref="pdfDetail" onLoad={this.onPdfLoad} src={media.path} frameborder="0"></iframe>
                  </div>
                </ReactScrollbar>
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
              onTouchTap={this.choosePdf()}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

Pdf.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Pdf = reduxForm({
  form: 'pdfDetail',
})(injectI18N(Pdf));

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
    pdfDetailForm: state.form.pdfDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Pdf = connect(mapStateToProp)(Pdf);
export default Pdf;