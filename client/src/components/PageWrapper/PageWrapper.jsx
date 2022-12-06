import React from 'react'
import styled from 'styled-components';
import {Header} from '../Header/Header';

const Wrapper = styled.div`
  padding: 30px 50px;
`;

export const PageWrapper = ({title, children}) => {
  return (
    <>
      <Header />
      <Wrapper className='pageWrapper'>
        {title && <h1>{title}</h1>}
        {children}
      </Wrapper>
    </>
  )
}
