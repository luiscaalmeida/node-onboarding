import React from 'react'
import { useState } from 'react';
import { Member } from './Member';
import styled from 'styled-components';

const ContentRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 35px 25px 25px;
  gap: 10px;
  max-width: 550px;
  overflow: auto;
  max-height: 800px;
`;

const ShowMoreLess = styled.span`
  color: #4759B0;
  font-size: 20px;
  padding: 10px;
  background-color: white;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: white;
    border-radius: 15px;
    background-color: #4759B0;
    transition: color 0.3s ease-in-out,
                background-color 0.3s ease-in-out;
  }
`;

export const MemberGroup = ({group}) => {
  const [limit, setLimit] = useState(5);
  const membersToShow = group.slice(0, limit || group.length);                

  return (
    <ContentRight style={{padding: '0', minWidth: '400px'}}>
      {group && membersToShow.map((member, index) => <Member key={`${member?.id}-${index}`} member={member} />)}
      <ShowMoreLess
        onClick={() => limit ? setLimit(null) : setLimit(5)}
      >
        {limit ? "Show All" : "Show Less"}
      </ShowMoreLess>
    </ContentRight>
  )
}
