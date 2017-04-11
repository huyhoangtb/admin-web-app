import React from 'react'
import {Field} from 'redux-form'
import Checkbox from 'material-ui/Checkbox'


const renderCheckbox = ({input, label, meta: {touched, error}, ...custom}) => (

    <Checkbox label={label}
              checked={input.value ? true : false}
              onCheck={input.onChange}
              {...input}
              {...custom}
    />

)

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 30/03/2017
 **/
class InputText extends React.Component {
    render() {
        return (
            <Field component={renderCheckbox} {...this.props}/>
        );
    }
}

export default InputText;