import React from 'react';
import {connect} from 'react-redux';
import {getTweets} from '../../ducks/tweets';
import Tweets from '../../components/Cards';
import {Row, Col} from 'react-bootstrap';

let filteredContent = [];
export class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      search: '',
      searchList: [],
      savedTweet: [],
      tweetList: this.props.tweets
    }
  }
  
  componentDidMount() {
    this.props._getTweets('TWEETS');
  }

  componentDidUpdate(prevState, prevProps) {
    const {savedTweet, tweetList} = this.state;
    let array = [...tweetList];
    if(savedTweet.length> 0 && savedTweet !== prevState.savedTweet){
      for( var i=array.length - 1; i>=0; i--){
        for( var j=0; j<savedTweet.length; j++){
            if(array[i] && (array[i].id == savedTweet[j].id)){
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
  }

   componentWillReceiveProps(prevProps){
    if(this.props.tweets !== prevProps.tweets){
      this.setState((state, props) => { 
        return {tweetList: props.tweets.tweets}
      })
    }
   }

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
    console.log(e, obj);
    e.dataTransfer.setData('Object', obj);
  };

  onDrop = (e) => {
    let id = e.dataTransfer.getData("object");
    let draggedObject = this.props.tweets.tweets.filter((twt) => {
      if(twt.id == id) {
        return twt;
      }
    });

    draggedObject.forEach(obj => (
      this.setState({savedTweet: [...this.state.savedTweet, obj]})
      ))
  }

  render(){
  const { tweets } = this.props;
  const {search, savedTweet,searchList, tweetList} = this.state;
  return (
    <div style={{margin: '20px'}}>
      <input 
        type='text' 
        placeholder=' Search Twitter ... '
        value={search} 
        onChange={this.handleSearch}
        style={{margin: '10px', width: '30%', padding: '5px', border: '1px solid black'}}
      />

      {tweetList.length > 0 ? (
        <Row >
          <Col sm={6} style={{ padding: '8px'}}>
              <Tweets tweet={tweetList} onDragStart={this.onDragStart}/>
          </Col>
          <Col sm={6} 
              style={{border: '0.5px dotted black', marginTop: '20px'}} 
              onDragOver = {(e) => this.onDragOver(e)}
              onDrop= {e => this.onDrop(e)}>
              {savedTweet.length > 0 ? 
              <Tweets tweet={savedTweet} onDragStart={this.onDragStart}/> : 'Saved Tweets'
              }          
          </Col>
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
  dispatch => ({_getTweets: resourceType => dispatch(getTweets(resourceType))
  }))(App);
