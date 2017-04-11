/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import {connect} from 'react-redux';
import ImageDetail from './ImageDetail';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 08/04/2017
 **/
class MediaDetail extends React.Component {
    constructor(props) {
        super(props);
        this.renderDetailMedia = this.renderDetailMedia.bind(this);

    }

    renderDetailMedia(media) {
        console.log(media)
        return <ImageDetail media={media}/>;
        let type = media['type'];
        if (type && type === 'dir') {
            return;
        }
        switch (type) {
            case 'image': {
                return ImageDetail;
            }
            default:

        }
    }

    render() {
        let {media} = this.props;
        return (
            <div>
                {this.renderDetailMedia(media)}

            </div>
        );
    }
}

MediaDetail.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default connect()(injectI18N(MediaDetail));