import { all, fork } from 'redux-saga/effects';
import tweets, {sagas as tweetSaga } from './tweets';
import routes, {sagas as routeSaga } from './route';
import direction, {sagas as directionSaga} from './direction';
import stops, {sagas as stopsSaga} from './stops';
import timePointDeparture, {sagas as timePointDepartureSaga} from './timePointDeparture';

export default {
    direction,
    routes,
    stops,
    timePointDeparture,
    tweets
};

const allSagas = [
    ...directionSaga,
    ...routeSaga,
    ...stopsSaga,
    ...timePointDepartureSaga,
    ...tweetSaga
];

export function* rootSaga() {
    yield all(allSagas.map(saga => fork(saga)));
  }