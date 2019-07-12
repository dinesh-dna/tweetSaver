import React from 'react';
import {  Card } from 'react-bootstrap';

class Cards extends React.Component {
    render() {
        const {tweet} = this.props;
        return (
            <React.Fragment>
                {tweet.map(t => {
                    return <Card key={t.id} style={{padding: '5px', margin: '10px', backgroundColor: '#C6E2EE'}}>
                                <Card.Header style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Card.Img src={t.user.profileImageUrlHttps} style={{width: '50px'}}/>
                                    <Card.Title>{t.user.name}</Card.Title>
                                    <Card.Text>{`@${t.user.screenName}`}</Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">{t.text}</blockquote>
                                </Card.Body>
                            </Card>
                })}  
            </React.Fragment>
        );
    }
};

export default Cards;