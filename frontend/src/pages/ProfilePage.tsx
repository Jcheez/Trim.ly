import { Button, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TextFieldWithTitle from '../components/TextFieldWithTitle'
import useFetchData from '../hooks/useFetchData';
import { retrieveProfile } from '../adaptors/userAdaptor';
import { AuthContext } from '../contexts/authContext';

export default function ProfilePage() {

  // Define Auth Context
  const { authState } = useContext(AuthContext);

  // Fetch Data
  const adaptor = retrieveProfile(authState)
  const { data, loading } = useFetchData(adaptor);

  // States
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  useEffect(() => {
    if (!loading && data.code === 200) {
      setUsername(data.data.username)
    }
  }, [loading, data])

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <Stack direction={'column'} spacing={5}>
          <Typography fontSize={30} color={'#003a66'} fontWeight={'bold'} textAlign={'left'}>
            Account Settings
          </Typography>

          <Grid container rowSpacing={2} columnSpacing={0}>

            <Grid item xs={12}>
              <Typography fontSize={25} fontWeight={'bold'} textAlign={'left'}>
                Change Username
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <TextFieldWithTitle
                placeholder=''
                type='text'
                title='Username'
                handleSetState={setUsername}
                value={username}
                error={usernameError}
              />
            </Grid>

            <Grid item xs={3} display={'flex'} alignItems={'flex-end'} justifyContent={'center'}>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  borderRadius: 100,
                  textTransform: 'none'
                }}
                size='large'
              >
                Save Changes
              </Button>
            </Grid>

          </Grid>

          <Grid container rowSpacing={2} columnSpacing={0}>

            <Grid item xs={12}>
              <Typography fontSize={25} fontWeight={'bold'} textAlign={'left'}>
                Change Password
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <Stack direction={'column'} spacing={2}>
                <TextFieldWithTitle
                  placeholder=''
                  type='password'
                  title='Old Password'
                  handleSetState={setOldPassword}
                  value={oldPassword}
                  error={oldPasswordError}
                />

                <TextFieldWithTitle
                  placeholder=''
                  type='password'
                  title='New Password'
                  handleSetState={setNewPassword}
                  value={newPassword}
                  error={newPasswordError}
                />

                <TextFieldWithTitle
                  placeholder=''
                  type='password'
                  title='Password Confirmation'
                  handleSetState={setPasswordConfirmation}
                  value={passwordConfirmation}
                  error={passwordConfirmationError}
                />
              </Stack>
            </Grid>

            <Grid item xs={3} display={'flex'} alignItems={'flex-end'} justifyContent={'center'}>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  borderRadius: 100,
                  textTransform: 'none'
                }}
                size='large'
              >
                Save Changes
              </Button>
            </Grid>

          </Grid>

          <Grid container rowSpacing={2} columnSpacing={0}>

            <Grid item xs={12}>
              <Typography fontSize={25} fontWeight={'bold'} textAlign={'left'}>
                Delete Account
              </Typography>
            </Grid>

            <Grid item xs={9}>
              <Typography fontSize={15} textAlign={'left'}>
                By deleting your account, all data in this account will be deleted permanently.
                This <Typography component="span" fontWeight='bold'> CANNOT</Typography> be undone.
              </Typography>
            </Grid>

            <Grid item xs={3} display={'flex'} alignItems={'flex-end'} justifyContent={'center'}>
              <Button
                variant='outlined'
                color='error'
                sx={{
                  borderRadius: 100,
                  textTransform: 'none'
                }}
                size='large'
              >
                Delete Account
              </Button>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  )
}
