import { AppBar, Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../contexts/authContext';
import { signoutUser } from '../adaptors/userAdaptor';
import { useNavigate } from 'react-router-dom';

export default function LandingNavbar() {

  // Authcontext
  const { insertToken, insertExpiry } = useContext(AuthContext);

  // Navigate
  const navigate = useNavigate();

  // Functions
  const handleSignOutUserOnClick = () => {
    signoutUser().then(_ => {
      insertToken('')
      insertExpiry(0)
    })
  }

  const handleProfileOnClick = () => {
    navigate('/acc');
  }

  return (
    <AppBar position='sticky' elevation={0}>
      <Container disableGutters maxWidth={false} sx={{ px: { xs: '25px', sm: '50px', md: '100px', lg: '200px', xl: '400px' } }}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} height={'80px'}>

          <Typography
            variant="h5"
            noWrap
            component="a"
            color={'black'}
            href='/main'
            sx={{
              display: { xs: 'none', sm: 'flex' },
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: { xs: '15', md: 35 }
            }}
          >
            TRIMLY
          </Typography>
          <Stack sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={2} direction={'row'}>
            <Button variant='rounded' onClick={handleProfileOnClick}>Profile</Button>
            <Button variant='rounded' onClick={handleSignOutUserOnClick}>Sign out</Button>
          </Stack>

          {/* mobile view for logout and profile icons */}
          <Stack sx={{ display: { xs: 'flex', sm: 'none' } }} spacing={0} direction={'row'}>
            <IconButton>
              <MenuIcon color='secondary' />
            </IconButton>
            <Box display={'flex'} alignItems={'center'}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                color={'black'}
                href='/main'
                sx={{
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: 20
                }}
              >
                TRIMLY
              </Typography>
            </Box>
          </Stack>

          <Stack sx={{ display: { xs: 'flex', sm: 'none' } }} spacing={1} direction={'row'}>
            <IconButton>
              <AccountCircleIcon color='secondary' />
            </IconButton>
            <IconButton onClick={handleSignOutUserOnClick}>
              <LogoutIcon color='secondary' />
            </IconButton>
          </Stack>
        </Box>
      </Container >
    </AppBar >
  )
}
