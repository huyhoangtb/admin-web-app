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
class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.chooseAudio = this.chooseAudio.bind(this);
    this.onAudioLoad = this.onAudioLoad.bind(this);
  }

  closeMediaPopup() {
    let {dispatch} =this.props;
    dispatch(viewMediaDetail({
      viewing: false
    }))
  }

  onAudioLoad({target:audio}) {
    let {dispatch} = this.props;
    dispatch(change('audioDetail', 'width', audio.offsetWidth));
    dispatch(change('audioDetail', 'height', audio.offsetHeight));
  }

  chooseAudio() {
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
    let {intl, media, initialValues} =this.props;
    let file = media.name;
    if(file.indexOf(".mp3") == file.length - 4) {
      return (
        <div className="audio-detail clearfix">
          {media &&
          <div>
            <div className="clearfix">
              <div className="audio-panel  pull-left">
                <div className="center-block-panel">
                  <audio controls>
                    <source src={media.path} type="audio/ogg"/>
                    <source src={media.path} type="audio/mpeg"/>
                  </audio>
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
                onTouchTap={this.chooseAudio()}
              />
            </div>
          </div>
          }
        </div>

      );
    }
  }
}

Audio.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Audio = reduxForm({
  form: 'audioDetail',
})(injectI18N(Audio));

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
    audioDetailForm: state.form.audioDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Audio = connect(mapStateToProp)(Audio);
export default Audio;