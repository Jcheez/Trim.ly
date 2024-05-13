import React from 'react'
import { Outlet } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'
import { Box } from '@mui/material'

export default function WithNavBarLayout() {
	return (
		<>
			<LandingNavbar />
      <Box sx={{
        px: {
          xs:'25px',
          sm: '50px',
          md:'100px',
          lg: '200px' ,
          xl: '400px'
        },
        py: 3
      }}>
			  <Outlet />
      </Box>
		</>
	)
}
