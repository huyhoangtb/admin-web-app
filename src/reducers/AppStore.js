/**
 * Created by Peter Hoang Nguyen on 3/19/2017.
 */
import {combineReducers} from 'redux'
import {User} from './user/Auth';
import {MM} from './mm/mm';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';


const AppReducers = combineReducers({
    user: User,
    mm: MM,
    router: routerReducer,
    form: formReducer
});

export default AppReducers;