import { Typography } from '@mui/material'
import React from 'react'

export const TitleHeader = ({title, tagline}) => {
  return (
    <>
      <Typography gutterBottom variant="h4" component="div">
        {title}
        <div style={{color: "#3f3f3f", fontSize: "14px"}}>{tagline}</div>
      </Typography>
    </>
  )
};
