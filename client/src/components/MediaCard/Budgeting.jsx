import { Divider, Typography } from '@mui/material'
import React from 'react'
import { NumericFormat } from 'react-number-format'

export const Budgeting = ({budget, revenue}) => {
  return (
    <>
      <Typography variant="h6" color="text.primary"> {"Budgeting"} </Typography>
      <span>
        <span style={{color: "#3f3f3f", fontSize: "15px"}}>{"Budget: "}</span>
        <NumericFormat value={budget} displayType={'text'} thousandSeparator={true} suffix={' €'} style={{display: 'inline'}}/>
      </span>
      <span>
        <span style={{color: "#3f3f3f", fontSize: "15px"}}>{"Revenue: "}</span>
        <NumericFormat value={revenue} displayType={'text'} thousandSeparator={true} suffix={' €'} />
      </span>
      <Divider />
    </>
  )
};
