import { Typography } from '@mui/material'
import React from 'react'

function BlanckPage() {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-center" style={{height:"80vh"}}>
                <Typography variant='h3' sx={{fontSize:"55px"}}>Blank Page</Typography>
            </div>
        </div>
    </div>
  )
}

export default BlanckPage