import { takeLatest } from 'redux-saga/effects';
import upperCase from 'upper-case';
import {getWorkerSaga} from './sagas';
import {REQUEST_SUCCEEDED, REQUEST_FAILED} from './requests';

export const initialState = {};
export const GET_TWEETS = 'tweets/getTweets';
export const sagas = [tweetWatcherSaga];

export function getTweets(resourceType, id, query, details) { 
    return {
        type: GET_TWEETS,
        resourceType: upperCase(resourceType),
        id: 'obama' ,
        query : 'count=10',
        details
      };
}

export function* tweetWatcherSaga() {
    yield takeLatest(GET_TWEETS, getWorkerSaga);
  }
  
export default function reducer(state = initialState, action) { 
    const {type, requestType, response} = action;
    switch(type) {
        case REQUEST_SUCCEEDED:
            if(requestType === GET_TWEETS) {
                return  response ? response : state;
            }
            
        // eslint-disable-next-line no-fallthrough
        case REQUEST_FAILED:
            return state;
        default:
            return state;
    }
};