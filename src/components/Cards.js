import React from 'react';
import {  Card } from 'react-bootstrap';
import {StyledCard, StyledCardHeader} from './styles';

class Cards extends React.Component {
    render() {
        const {tweet, onDragStart} = this.props;
        return (
            <React.Fragment>
                {tweet.map(t => {
                    return <StyledCard key={t.id} draggable={true} onDragStart={e=> onDragStart(e, t.id)}>
                                <StyledCardHeader>
                                    <Card.Img src={t.user.profileImageUrlHttps} style={{width: '60px'}}/>
                                    <Card.Title>{t.user.name}</Card.Title>
                                    <Card.Text>{`@${t.user.screenName}`}</Card.Text>
                                </StyledCardHeader>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">{t.text}</blockquote>
                                </Card.Body>
                            </StyledCard>
                })}  
            </React.Fragment>
        );
    }
};

export default Cards;