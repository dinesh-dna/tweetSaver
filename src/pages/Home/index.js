import React from 'react';
import {connect} from 'react-redux';
import {getDirection} from '../../ducks/direction';
import {getTweets} from '../../ducks/tweets';
import Tweets from '../../components/Cards';
import {Row, Col} from 'react-bootstrap';

export class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }
  
  componentDidMount() {
    this.props._getTweets('TWEETS');
  }

  // handleRouteChange = (e) => {
  //   const selectedRoute = this.props.routes.find(eachRoute =>  eachRoute.Description === e.target.value)
  //   this.setState(function(){
  //     return {selectedRoute: selectedRoute}
  //  })
  //   this.props._getDirection('DIRECTION',selectedRoute['Route']);
  // }

  // handleDirectionChange = (e) => {
  //   const selectedDirection = this.props.direction.find(eachDirection =>  eachDirection.Text === e.target.value)
  //   this.setState(function(){
  //     return {selectedDirection: selectedDirection}
  //  });
  //   this.props._getStops('STOPS',`${this.state.selectedRoute['Route']}/${selectedDirection['Value']}`);
  // };


  // handleStopEntry = () => {
  //   if(this.state.stopNumber !== undefined){
  //     this.props._getDepartureList('NEXTTRIP_BASEURL', this.state.stopNumber); 
  //     this.props.history.push('/nextTrip', {stopID: this.state.stopNumber});
  //   }
  //   else{
  //     alert('Please enter Stop number');
  //   }
  // };

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }
  render(){
  const { tweets } = this.props;
  const {search} = this.state;

  let filteredContent = Object.values(tweets).length > 0 ? 
        tweets.tweets.filter(tweet => {
            return tweet.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          }) : {}

  return (
    <div style={{margin: '20px'}}>
      <input 
        type='text' 
        placeholder=' Search Twitter ... '
        value={search} 
        onChange={this.handleSearch}
        style={{margin: '10px', width: '48%', padding: '10px', border: '1px solid black'}}
      />

      {filteredContent.length > 0 ? (
        <Row >
          <Col sm={6} style={{ padding: '8px'}}>
              <Tweets tweet={filteredContent} />
          </Col>
          <Col sm={5}>
            <Col style={{backgroundColor: '#E3E3E3'}}>
              Saved Tweets
            </Col>
              {/* <SavedTweets /> */}
          </Col>
        </Row>
      ) : <React.Fragment> No Tweets found ... </React.Fragment>}
    </div>
  );
  }
}

export default connect(state => {
  const {tweets} = state;

  return {
    tweets
    };
  },
  dispatch => ({_getTweets: resourceType => dispatch(getTweets(resourceType)),
    _getDirection: (resourceType,id) => dispatch(getDirection(resourceType,id))
    }))(App);
