/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import  InputText from 'components/forms/elements/input-text';
import FlatButton from 'material-ui/FlatButton';
import {viewMediaDetail} from '../../MediaActions';
import {reduxForm} from 'redux-form'
import {Quill} from 'react-quill';
import { change } from 'redux-form';

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
                            <InputText fullWidth={true} name="title" label={ t1(intl, 'title')}/>
                            <InputText fullWidth={true} name="alt" label={ t1(intl, 'Alt')}/>
                            <InputText className="margin-right15px" name="width"
                                       style={{width: "100px"}} value={43324324}
                                       label={ t1(intl, 'width')}/>
                            <InputText name="height" style={{width: "100px"}}
                                       label={ t1(intl, 'height')}/>
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