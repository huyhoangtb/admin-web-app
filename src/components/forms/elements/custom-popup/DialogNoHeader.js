/**
 * Created by Peter Hoang Nguyen on 4/3/2017.
 */
/**
 * Created by Peter Hoang Nguyen on 4/1/2017.
 */
import React from 'react';
import {injectI18N, t1} from "i18n";
import Dialog from 'material-ui/Dialog';
import './stylesheet.css';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 01/04/2017
 **/
class DialogNoHeader extends React.Component {

    render() {
        let {intl, closeOn, bodyClassName} = this.props;
        let close = t1(intl, "close");
        if(bodyClassName) {
            bodyClassName += " dialog-content-padding0 no-header-dialog";
        } else {
            bodyClassName = "dialog-content-padding0 no-header-dialog";
        }

        return (
                <Dialog
                    {...this.props}
                    onRequestClose={closeOn}
                    bodyClassName={bodyClassName}>
                    <a className="close-popup" href="#" onClick={closeOn} alt={close}>
                        <i className="mi mi-close" aria-hidden="true"></i>
                    </a>
                    {
                        this.props.children
                    }
                </Dialog>
        );
    }
}

export default injectI18N(DialogNoHeader);