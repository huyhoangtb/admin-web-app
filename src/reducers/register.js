/**
 * Created by Peter Hoang Nguyen on 4/12/2017.
 */
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import {User} from './user/Auth';
import {MM} from './mm/mm';

export default {
  user: User,
  mm: MM,
  router: routerReducer,
  form: formReducer
}