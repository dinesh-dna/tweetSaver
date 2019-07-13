import React from 'react';
import {Row} from 'react-bootstrap';
import icon from '../utils/tweet.png';

export function Header() {
    return (
        <React.Fragment>
            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start',marginLeft: '10px'}}>
                <img src={icon} alt="Tweet Saver" style={{width: '8%'}}/>
                <h4> Tweet Saver </h4>
            </Row>
            
        </React.Fragment>
    )
}