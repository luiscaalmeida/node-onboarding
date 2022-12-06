import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const MediaCardOverview = ({
  title,
  overview,
  imageUrl,
  mediaUrl,
}) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} style={{margin: "40px 40px 40px 0"}}>
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
