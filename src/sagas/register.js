/**
 * Created by Peter Hoang Nguyen on 4/12/2017.
 */

import {helloSaga} from './auth'
import {fork} from 'redux-saga/effects';

export default function* root() {
  yield [
    fork(helloSaga),
  ]
}
