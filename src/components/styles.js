import styled from 'styled-components/macro';
import { Card, Row } from 'react-bootstrap';

export const StyledLine = styled.hr`
    border: .5px solid lightgrey
`;

export const StyledHeaderRow = styled(Row)`
display: flex;
align-items: center;
justify-content: flex-start;
margin-left: 10px;
`;

export const StyledCard = styled(Card)`
    padding: 5px;
    background-color: #C6E2EE;
`;

export const StyledCardHeader = styled(Card.Header)`
    display: flex;
    justify-content: space-between;
`;