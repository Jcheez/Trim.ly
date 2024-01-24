import React from 'react'
import { Outlet } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'

export default function WithNavBarLayout() {
	return (
		<>
			<LandingNavbar />
			<Outlet />
		</>
	)
}
