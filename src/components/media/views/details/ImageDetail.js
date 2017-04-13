/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import  {TextField} from 'components/forms/elements';
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
class Image extends React.Component {
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
    dispatch(change('imageDetail', 'width', img.offsetWidth));
    dispatch(change('imageDetail', 'height', img.offsetHeight));
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
    console.log("initialValues", initialValues);
    return (
      <div className="img-detail clearfix">
        {media &&
        <div>
          <div className="clearfix">
            <div className="image-panel  pull-left">
              <div className="center-block-panel">
                <img ref="imgDetail" onLoad={this.onImgLoad}
                     src={media.path}/>
              </div>
            </div>
            <div className="ui-img-info">
              <TextField fullWidth={true} name="title"
                         floatingLabelText={ t1(intl, 'title')}
                         hintText={ t1(intl, 'title')}/>
              <TextField fullWidth={true} name="alt"
                         floatingLabelText={ t1(intl, 'Alt')}
                         hintText={ t1(intl, 'alt')}/>

              <TextField className="margin-right15px"
                         floatingLabelText="width"
                         hintText={ t1(intl, 'width')}
                         style={{width: "100px"}} value={43324324}/>

              <TextField name="height" style={{width: "100px"}}
                         floatingLabelText="height"
                         hintText={ t1(intl, 'height')}/>
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

Image.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Image = reduxForm({
  form: 'imageDetail',
})(injectI18N(Image));

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
    imageDetailForm: state.form.imageDetail,
    media: viewDetailMedia.data,
    currentRichText: state.mm.currentRichText
  })
}

Image = connect(mapStateToProp
)(Image)
export default Image;