import { AppBar, Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/authContext';
import { signoutUser } from '../adaptors/userAdaptor';

export default function LandingNavbar() {

  // Authcontext
  const { setAuthState } = useContext(AuthContext);

  // Functions
  const handleSignOutUserOnClick = () => {
    setAuthState('') // TODO: Might need to define helper functions in auth context for clearing state and defining state
    signoutUser().then(res => console.log(res.data))
  }

  return (
    <AppBar position='sticky' elevation={0}>
      <Container disableGutters maxWidth={false} sx={{px: {md:'100px', lg: '200px' , xl: '400px'}}}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} height={'80px'}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            color={'black'}
            href='/main'
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 35
            }}
          >
            TRIMLY
          </Typography>
          <Stack sx={{display: { xs: 'none', md: 'flex' } }} spacing={2} direction={'row'}>
            <Button variant='rounded'>Shortcuts</Button>
            <Button variant='rounded'>Linking to Telegram</Button>
            <Button variant='rounded' onClick={handleSignOutUserOnClick}>Sign out</Button>
          </Stack>
        </Box>
      </Container >
    </AppBar >
  )
}
