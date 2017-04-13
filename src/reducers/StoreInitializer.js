/**
 * Created by Peter Hoang Nguyen on 3/19/2017.
 */
import {combineReducers} from 'redux'
import {routerMiddleware} from 'react-router-redux';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {createStore, applyMiddleware, compose} from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import SagaRegister from 'sagas/register';
import ReducerRegister from './register';
import createSagaMiddleware from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist'

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const AppReducers = combineReducers(ReducerRegister);
const Store = createStore(
  AppReducers,
  undefined,
  compose(applyMiddleware(middleware),
    applyMiddleware(sagaMiddleware),
    autoRehydrate(), //auto persistence
devToolsEnhancer ? devToolsEnhancer() : f => f)
);
// begin periodically persisting the store
persistStore(Store, {whitelist: ['user']});
sagaMiddleware.run(SagaRegister);
export default Store;