/**
 * Created by Peter Hoang Nguyen on 4/12/2017.
 */
import React from 'react';
import {Field} from 'redux-form';
import {
  Checkbox as MUCheckBox,
  RadioButtonGroup as MURadioButtonGroup,
  SelectField as MUSelectField,
  TextField as Text,
  Toggle as MUToggle,
  DatePicker as MUDatePicker ,
  AutoComplete as MUAutoComplete ,
  Slider as MUSlider ,
  TimePicker as MUTimePicker
} from 'redux-form-material-ui';

export const Checkbox =  (props) => <Field component={MUCheckBox} {...props}/>
export const RadioButtonGroup =  (props) => <Field component={MURadioButtonGroup} {...props}/>
export const SelectField =  (props) => <Field component={MUSelectField} {...props}/>
export const TextField =  (props) => <Field component={Text} {...props}/>
export const Toggle =  (props) => <Field component={MUToggle} {...props}/>
export const DatePicker =  (props) => <Field component={MUDatePicker} {...props}/>
export const AutoComplete =  (props) => <Field component={MUAutoComplete} {...props}/>
export const Slider =  (props) => <Field component={MUSlider} {...props}/>
export const TimePicker =  (props) => <Field component={MUTimePicker} {...props}/>

