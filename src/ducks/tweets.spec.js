import { Reducer } from 'redux-testkit';
import SagaTester from 'redux-saga-tester';
import tweetsReducer, { initialState, getTweets, GET_TWEETS } from './tweets';
import {REQUEST_SUCCEEDED, requestSucceeded, REQUEST_FAILED, requestFailed } from './requests';

describe('Actions ', () => {
    it('should return the action object with resourceType', () => {
      const expected = {
        type: GET_TWEETS,
        resourceType: 'TWEETS',
        id: null,
        query: 'q=obama&count=10',
        details: undefined
      };
      const actual = getTweets('TWEETS', null, 'q=obama&count=10');
      expect(actual).toEqual(expected);
    });
  });

  describe('Reducer test   ', () => {
      it('reducer test with initial state', () => {
          const expected = {};

            Reducer(tweetsReducer)
                .withState(initialState)
                .expect(getTweets)
                .toReturnState(expected)
      });

    it('reducer test with response', () => {
        const response = [{
            Text: 'Target',
            Value: 2
            }];

        const action = requestSucceeded(REQUEST_SUCCEEDED, GET_TWEETS, response)

        const expected = [{
            Text: 'Target',
            Value: 2
            }];

        Reducer(tweetsReducer)
            .withState(response)
            .expect(action)
            .toReturnState(expected)
    });
  });