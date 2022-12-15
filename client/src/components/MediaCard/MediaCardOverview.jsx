import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';

const removeMediaStyles = {
  position: 'absolute',
  top: '8px',
  left: '8px',
  backgroundColor: '#d2d2d2',
  borderRadius: '25px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  padding: '4px',
  boxShadow: '2px 1px 5px #888888',

  '&:hover': {
    backgroundColor: '#5f5f5f',

    svg: {
      color: '#d2d2d2',
    }
  },
};

const StyledIconButton = styled(IconButton)(removeMediaStyles);

export const MediaCardOverview = ({
  title,
  overview,
  imageUrl,
  mediaUrl,
  playlistName,
  removeMedia
}) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} style={{margin: "0 40px 40px 0"}}>
      {playlistName && (
        <StyledIconButton color="secondary" onClick={removeMedia}>
          <RemoveIcon />
        </StyledIconButton>
      )}
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {overview}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='secondary' to={mediaUrl} component={Link}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
