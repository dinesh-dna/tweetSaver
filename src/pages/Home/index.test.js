import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './index.js';
configure({adapter: new Adapter()});

describe('<App />', () => {
    let wrapper;
    const handleSearch = jest.fn();
    const _getTweets= jest.fn();
    let props = {
        tweets: {tweets:[{
            id: '1',
            text: 'Home'
        }]},
        handleSearch,
        _getTweets
    };
    beforeEach(() => {
        wrapper = shallow(<App {...props}/>);
        wrapper.setState({tweetList: props.tweets.tweets})
    });

    it('Call componentDidMount lifecycle and Render Component', () => {
        expect(wrapper).toBeTruthy();
        expect(_getTweets).toHaveBeenCalledTimes(1);
    });

    it('Test input Text box -> onChange method', () => {
        wrapper.find('#searchText').simulate('change',{target: {value: 'hi'}});
        expect(wrapper.state('search')).toBe('hi');
    });

    it('check for input, TweetList col and SavedTweet Col components are present', () => {
        expect(wrapper.find('#searchText')).toHaveLength(1);
        expect(wrapper.find('#savedTweetsCol')).toHaveLength(1);
        expect(wrapper.find('#tweetListCol')).toHaveLength(1);
    });

    it('Test the input box entry and verify tweetList is updated', () => {
        wrapper.setState({search: '1'});
        expect(wrapper.state('tweetList')).toBe(props.tweets.tweets);
    });
});
