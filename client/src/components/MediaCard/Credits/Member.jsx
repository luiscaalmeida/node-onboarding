import styled from '@emotion/styled';
import React from 'react';

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
}
const wrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '5px',
}
const characterStyles = {
  fontWeight: 'bold',
  fontSize: '20px',
}
const nameStyles = {
  fontSize: '14px',
  color: 'gray',

  '> span': {
    fontSize: '16px',
    color: 'black',
  }
}
const imgStyles = {
  maxHeight: '150px',
  maxWidth: '100px',
  borderRadius: '10px',
};

const StyledImg = styled('img')(imgStyles);
const StyledDivContainer = styled('div')(containerStyles);
const StyledRightWrapper = styled('div')(wrapperStyles);
const StyledCharacter = styled('div')(characterStyles);
const StyledName = styled('div')(nameStyles);

export const Member = ({member}) => {
  // const {cast_id, credit_id, id, name, profile_path} = member;
  const {name, profile_path} = member;
  const imageUrl = profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path}` : '/assets/images/default_profile.jpeg';

  return (
    <StyledDivContainer>
      <StyledImg src={imageUrl} alt="actor face" />
      {!member?.department && member?.character ? (
        <StyledRightWrapper>
          <StyledCharacter>{member?.character}</StyledCharacter>
          <StyledName>Acted by <span>{name}</span></StyledName>
        </StyledRightWrapper>
      ) : (
        <StyledRightWrapper>
          <StyledCharacter>{name}</StyledCharacter>
          <StyledName>{`${member?.department}: ${member?.job}`}</StyledName>
        </StyledRightWrapper>
      )}
    </StyledDivContainer>
  )
}
