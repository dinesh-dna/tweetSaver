import React from 'react';
import icon from '../utils/tweet.png';
import {StyledLine, StyledHeaderRow} from './styles';

export function Header() {
    return (
        <React.Fragment>
            <StyledHeaderRow>
                <img src={icon} alt="Tweet Saver" style={{width: '8%'}}/>
                <h4> Tweet Saver </h4>
            </StyledHeaderRow>
            < StyledLine />
        </React.Fragment>
    )
}