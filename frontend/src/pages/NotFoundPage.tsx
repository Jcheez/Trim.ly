import { Box, Typography } from '@mui/material'
import React from 'react'

export default function NotFoundPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
      <Box>
        <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'}>This page is not valid.</Typography>
        <Typography fontSize={100} fontWeight={'bold'}>404 Not Found</Typography>
      </Box>
    </Box>
  )
}
