import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from '@emotion/styled';

const favouriteWrapperStyles = {
  position: 'absolute',
  zIndex: 99,
  right: '80px',
  top: '20px',
  width: 'fit-content',
  backgroundColor: '#d2d2d2',
  borderRadius: '15px',
  padding: '5px 10px',
  boxShadow: '2px 1px 5px #888888',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',

  svg: {
    marginTop: '5px',
    color: 'red',
    width: '25px',
    height: '25px',
    padding: '0',
    transition: 'all 0.2s ease-in-out',
  },

  '&:hover': {
    backgroundColor: '#a2a2a2',

    svg: {
      color: 'white',
    }
  },
};

const StyledFavoriteWrapper = styled('div')(favouriteWrapperStyles);

export const Favorite = ({add, remove}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    if (isFavourite) remove();
    else add();
    setIsFavourite(prevIsFavourite => !prevIsFavourite);
  }

  return (
    <StyledFavoriteWrapper onClick={toggleFavourite}>
      {isFavourite
        ? <FavoriteIcon />
        : <FavoriteBorderIcon />
      }
    </StyledFavoriteWrapper>
  );
};
