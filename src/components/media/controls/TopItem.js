/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
import React from 'react';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 03/04/2017
 **/
class TopItem extends React.Component {

  render() {
    let {onAction, iconClass} = this.props;

    return (
      <li className="item" onClick={() => {
        onAction()
      }}>
        <a href="#"><i className={iconClass} aria-hidden="true"></i></a>
      </li>
    );
  }
}


export default TopItem;

