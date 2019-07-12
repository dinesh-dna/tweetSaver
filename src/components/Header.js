import React from 'react';
import {Row, Col } from 'react-bootstrap';
import icon from '../utils/tweet.png';
import {HeaderCol} from '../utils/styles';

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