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
class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.onWordLoad = this.onWordLoad.bind(this);
  }

  closeMediaPopup() {
    let {dispatch} =this.props;
    dispatch(viewMediaDetail({
      viewing: false
    }))
  }

  onWordLoad({target:word}) {
    let {dispatch} = this.props;
    dispatch(change('wordDetail', 'width', word.offsetWidth));
    dispatch(change('wordDetail', 'height', word.offsetHeight));
  }

  chooseWord() {
    let {dispatch, currentRichText, media} = this.props;
    let range = currentRichText.selection;
    // currentRichText.quillJs.insertEmbed(range.index, 'word', {
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
              onTouchTap={this.chooseWord()}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

Word.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Word = reduxForm({
  form: 'wordDetail',
})(injectI18N(Word));

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
    wordDetailForm: state.form.wordDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Word = connect(mapStateToProp)(Word);
export default Word;