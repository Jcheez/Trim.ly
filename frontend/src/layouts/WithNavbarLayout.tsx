import React from 'react'
import { Outlet } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'
import { Box } from '@mui/material'

export default function WithNavBarLayout() {
	return (
		<>
			<LandingNavbar />
      <Box sx={{px: {md:'100px', lg: '200px' , xl: '400px'}}}>
			  <Outlet />
      </Box>
		</>
	)
}
