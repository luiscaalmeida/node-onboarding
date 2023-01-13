import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-radius: 15px;
  width: fit-content;
  box-shadow: 2px 1px 8px #cacaca;
`;

const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
  overflow: auto;
  max-height: 800px;
`;

const ContentLeft = styled.div`
  position: relative;
`;

const DetailCard = ({children}) => (
  <Wrapper>
    {children}
  </Wrapper>
);

const LeftSide = ({children}) => (
  <ContentLeft>
    {children}
  </ContentLeft>
);

const RightSide = ({children}) => (
  <ContentRight style={{overflow: 'hidden'}}>
    {children}
  </ContentRight>
);

DetailCard.LeftSide = LeftSide;
DetailCard.RightSide = RightSide;
export {DetailCard};
