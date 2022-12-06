import { Divider, Typography } from '@mui/material'
import React from 'react'

const Overview = ({overview}) => {
  return (
    <>
      <Typography variant="h6" color="text.primary"> {"Overview"} </Typography>
      <Typography variant="body1" color="text.secondary"> {overview} </Typography>
      <Divider />
    </>
  )
}

export default Overview
