import React from 'react'
import { Field } from 'redux-form'
import SelectField from 'material-ui/SelectField'

const renderSelectField = ({input, label, meta: {touched, error}, children}) => (
    <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}/>
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
            <Field component={renderSelectField} {...this.props}/>
        );
    }
}

export default InputText;