import * as React from 'react';
import styled from 'styled-components';
import { DetailCard } from '../DetailCard';
import { TitleHeader } from '../MediaCard/TitleHeader';
import { PersonInfo } from './PersonInfo';


const Img = styled.img`
  display: flex;
  height: 800px;
  width: auto;
  max-width: 600px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const MemberCardDetail = ({
  id,
  name,
  type,
  imageUrl,
  biography, 
  birthday,
  deathday,
  place_of_birth,
  popularity,
  known_for_department
}) => {

  return (
    <DetailCard> 
      <DetailCard.LeftSide>
        <Img src={imageUrl} />
      </DetailCard.LeftSide>
      <DetailCard.RightSide>
        <TitleHeader title={name} />
        <PersonInfo
          id={id}
          name={name}
          imageUrl={imageUrl}
          biography= {biography}
          birthday={birthday}
          deathday={deathday}
          place_of_birth={place_of_birth}
          popularity={popularity}
          known_for_department={known_for_department}
        />
      </DetailCard.RightSide>
    </DetailCard>
  );
};
