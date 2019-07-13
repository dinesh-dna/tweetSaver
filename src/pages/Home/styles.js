import styled from 'styled-components/macro';
import { Col } from 'react-bootstrap';

export const StyledLine = styled.hr`
    border: .5px solid lightgrey
`;

export const StyledInput = styled.input`
    border: 1px solid #424446;
    margin: 10px;
    width: 30%;
    padding: 5px;
`;

export const TweetListCol = styled(Col)`
    padding: 8px;
`;

export const SavedTweetCol = styled(Col)`
    border: 1px dotted black;
    background-color: #E3E3E3;
    margin-top: 10px;
    min-height: 20vh;
`;
