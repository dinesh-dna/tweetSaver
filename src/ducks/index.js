import { all, fork } from 'redux-saga/effects';
import tweets, {sagas as tweetSaga } from './tweets';

export default {
    tweets
};

const allSagas = [
    ...tweetSaga
];

export function* rootSaga() {
    yield all(allSagas.map(saga => fork(saga)));
  }