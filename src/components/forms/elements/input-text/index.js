import React from 'react'
import { Field } from 'redux-form'
import TextField from 'material-ui/TextField'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
               floatingLabelText={label}
               errorText={touched && error}
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
            <Field component={renderTextField} {...this.props}/>
        );
    }
}

export default InputText;