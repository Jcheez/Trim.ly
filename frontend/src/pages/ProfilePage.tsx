import { Button, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TextFieldWithTitle from '../components/TextFieldWithTitle'
import useFetchData from '../hooks/useFetchData';
import { retrieveProfile, updateUsername } from '../adaptors/userAdaptor';
import { AuthContext } from '../contexts/authContext';
import PopupAlert from '../components/PopupAlert';

export default function ProfilePage() {

  // Define Auth Context
  const { authState } = useContext(AuthContext);

  // Fetch Data
  const retrieveProfileAdaptor = retrieveProfile(authState)
  const { data, loading } = useFetchData(retrieveProfileAdaptor);

  // States
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const [isPopupAlertOpen, setIsPopupAlertOpen] = useState(false)
  const [popupAlertMessage, setPopupAlertMessage] = useState('')

  useEffect(() => {
    if (!loading && data.code === 200) {
      setUsername(data.data.username)
    }
  }, [loading, data])

  const handleUpdateUsernameOnclick = () => {

    if (isUsernameValid(username)) {
      console.log("NEW USERNAME IS VALID")
      updateUsername(username, authState)
        .then(res => {
          if (res.status === 204) {
            setPopupAlertMessage('Username has been successfully updated')
            setIsPopupAlertOpen(true)
          }
        })
        .catch(err => {
          const errorPayload = err.response.data;
          console.error(`Error: ${errorPayload.message}`);
          setUsernameError(errorPayload.message);
        })
    }
  }

  /**
 * A helper function which validates the user's username
 * @param username The user's desired username
 * @returns
 */
  const isUsernameValid = (
    username: string,
  ) => {
    console.log(username, "CALLED")
    setUsernameError('');
    let isValid = true;

    if (username.length < 8) {
      isValid = false;
      setUsernameError('Username must be at least 8 characters');
    }

    return isValid;
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
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
                  onClick={handleUpdateUsernameOnclick}
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
          <PopupAlert autoHideDuration={3000} handleClose={() => setIsPopupAlertOpen(false)} open={isPopupAlertOpen} message={popupAlertMessage} type={'success'}/>
        </>
      )}
    </>
  )
}
