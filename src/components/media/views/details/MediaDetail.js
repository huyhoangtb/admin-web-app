/**
 * Created by Peter Hoang Nguyen on 4/8/2017.
 */
import React from 'react';
import ImageDetail from './ImageDetail';
import AudioDetail from './AudioDetail';
import PdfDetail from './PdfDetail';
import VideoDetail from './VideoDetail';
import ExcelDetail from './ExcelDetail';
import WordDetail from './WordDetail';
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
    let type = media['type'];
    if (type && type === 'dir') {
      return;
    }
    switch (type) {
      case 'image':
        return <ImageDetail media={media}/>;
        break;
      case 'audio':
        return <AudioDetail media={media}/>;
        break;
      case 'pdf':
        return <PdfDetail media={media}/>;
        break;
      case 'video':
        return <VideoDetail media={media}/>;
        break;
      case 'excel':
        return <ExcelDetail media={media}/>;
        break;
      case 'word':
        return <WordDetail media={media}/>;
        break;
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

export default MediaDetail;