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
class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeMediaPopup = this.closeMediaPopup.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
  }

  closeMediaPopup() {
    let {dispatch} =this.props;
    dispatch(viewMediaDetail({
      viewing: false
    }))
  }

  onImgLoad({target:img}) {
    let {dispatch} = this.props;
    dispatch(change('videoDetail', 'width', img.offsetWidth));
    dispatch(change('videoDetail', 'height', img.offsetHeight));
  }

  chooseImage() {
    let {dispatch, currentRichText, media} = this.props;
    let range = currentRichText.selection;
    currentRichText.quillJs.insertEmbed(range.index, 'image', {
      src: media.path,
      width: 300
    }, Quill.sources.USER);
    dispatch(viewMediaDetail({
      viewing: false
    }));
  }

  render() {
    let {intl, media, initialValues} =this.props;
    return (
      <div className="audio-detail clearfix">
        {media &&
        <div>
          <div className="clearfix">
            <div className="audio-panel pull-left">
              <div className="center-block-panel">
                <video width="400" controls>
                  <source onLoad={this.onImgLoad} src={media.path} type="video/mp4" />
                </video>
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
              onTouchTap={this.chooseImage}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

Video.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Video = reduxForm({
  form: 'videoDetail',
})(injectI18N(Video));

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
    videoDetailForm: state.form.videoDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Video = connect(mapStateToProp)(Video);
export default Video;