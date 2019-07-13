import React from 'react';
import {connect} from 'react-redux';
import {getTweets} from '../../ducks/tweets';
import Tweets from '../../components/Cards';
import {Row} from 'react-bootstrap';
import {StyledInput, TweetListCol, SavedTweetCol} from './styles';

let filteredContent = [];
export class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      search: '',
      savedTweet: JSON.parse(localStorage.getItem('savedtweet')) || [],
      tweetList: this.props.tweets
    }
  }
  
  componentDidMount() {
    this.props._getTweets('TWEETS', null, 'q=obama&count=10');
  }

  componentDidUpdate(prevState, prevProps) {
    const {savedTweet, tweetList} = this.state;
    let array = [...tweetList];
    this.removeFromTweetList(savedTweet, tweetList, array, prevState);
  }

   componentWillReceiveProps(prevProps){
    if(this.props.tweets !== prevProps.tweets){
      this.setState((state, props) => { 
        return {tweetList: props.tweets.tweets}
      })
    }
   }

   removeFromTweetList = (savedTweet, tweetList, array, prevState) => {
    if(savedTweet.length> 0 && savedTweet !== prevState.savedTweet){
      for( var i=array.length - 1; i>=0; i--){
        for( var j=0; j<savedTweet.length; j++){
            if(array[i] && (array[i].id === savedTweet[j].id)){
              array.splice(i, 1);
              this.setState((state) => {
                return {
                  tweetList: array
                }
              })
            }
          }
        }
    }
  };

  handleSearch = (event) => {
     this.setState({search: event.target.value}, function() {
        filteredContent = Object.values(this.state.tweetList).length > 0 ? 
        this.props.tweets.tweets.filter(tweet => {
            return tweet.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }) : {}
          this.setState(() => {
            return {tweetList: filteredContent}
          })
     })
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDragStart = (e, obj) => {
    e.dataTransfer.setData('Object', obj);
  };

  onDrop = (e) => {
    let id = e.dataTransfer.getData("object");
    let draggedObject = this.props.tweets.tweets.filter((twt) => {
        return twt.id == id
    });

    draggedObject.forEach(obj => (
      this.setState({savedTweet: [...this.state.savedTweet, obj]}, () => {
        localStorage.setItem('savedtweet', JSON.stringify(this.state.savedTweet))
      })))
    }

  render(){
  const {search, savedTweet, tweetList} = this.state;
  return (
    <div style={{margin: '20px'}}>
      <StyledInput 
        id = 'searchText'
        type='text' 
        placeholder=' Search Twitter ... '
        value={search} 
        onChange={this.handleSearch}
      />
      {tweetList.length > 0 ? (
        <Row >
          <TweetListCol sm={6} id='tweetListCol'>
              <Tweets tweet={tweetList} onDragStart={this.onDragStart}/>
          </TweetListCol>
          <SavedTweetCol sm={6} 
              id = 'savedTweetsCol'
              onDragOver = {(e) => this.onDragOver(e)}
              onDrop= {e => this.onDrop(e)}
              >
              {savedTweet.length > 0 ? 
              <Tweets tweet={savedTweet} onDragStart={this.onDragStart}/> : 'Saved Tweets'
              }          
          </SavedTweetCol>
        </Row>
      ) : <React.Fragment> No Tweets found ... </React.Fragment>}
    </div>
  );
  }
}

export default connect(state => {
  const { tweets } = state;
  return {
    tweets
    };
  },
  dispatch => ({_getTweets: (resourceType,id, query) => dispatch(getTweets(resourceType,id,query))
  }))(App);
