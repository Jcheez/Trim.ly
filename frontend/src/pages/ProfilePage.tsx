import { Button, Grid, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TextFieldWithTitle from '../components/TextFieldWithTitle'
import { deleteUserAccount, retrieveProfile, updatePassword, updateUsername } from '../adaptors/userAdaptor';
import { AuthContext } from '../contexts/authContext';
import PopupAlert from '../components/PopupAlert';

export default function ProfilePage() {

  // Define Auth Context
  const { getAccessToken } = useContext(AuthContext);

  // State for page loading
  const [loading, setLoading] = useState(true)

  // States
  const [hasSetPassword, setHasSetPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false)
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

    // Fetch Profile Data
    getAccessToken().then(token => {
      retrieveProfile(token)
      .then(res => {
        if (res.data.code === 200) {
          // console.log(res.data.data.username)
          setLoading(false)
          setUsername(res.data.data.username)
          setHasSetPassword(res.data.data.hasSetPassword)
        }
      })
    })
  }, [])

  const handleUpdateUsernameOnclick = async () => {

    if (isUsernameValid(username)) {
      const token = await getAccessToken()
      updateUsername(username, token)
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
    setUsernameError('');
    let isValid = true;

    if (username.length < 8) {
      isValid = false;
      setUsernameError('Username must be at least 8 characters');
    }

    return isValid;
  };

  const arePasswordsValid = (oldPassword: string | undefined, newPassword: string, passwordConfirmation: string) => {

    setOldPasswordError('')
    setNewPasswordError('')
    setPasswordConfirmationError('')

    let isValid = true;

    if (oldPassword !== undefined && !/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(oldPassword)) {
      isValid = false;
      setOldPasswordError(
        'Password must be at least 8 characters with at least 1 uppercase letter and 1 lowercase letter'
      );
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(newPassword)) {
      isValid = false;
      setNewPasswordError(
        'Password must be at least 8 characters with at least 1 uppercase letter and 1 lowercase letter'
      );
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(passwordConfirmation)) {
      isValid = false;
      setPasswordConfirmationError(
        'Password must be at least 8 characters with at least 1 uppercase letter and 1 lowercase letter'
      );
    }

    if (oldPassword === passwordConfirmation) {
      isValid = false;
      setPasswordConfirmationError('Old and new password cannot be the same!')
    }

    if (newPassword !== passwordConfirmation) {
      isValid = false;
      setPasswordConfirmationError('Password does not match! Try again')
    }

    return isValid
  }

  const handleUpdatePasswordOnClick = async () => {
    if (arePasswordsValid(oldPassword, newPassword, passwordConfirmation)) {
      const token = await getAccessToken()
      updatePassword(oldPassword, passwordConfirmation, token)
        .then(res => {
          if (res.status === 204) {
            setPopupAlertMessage('Password has been successfully updated')
            setIsPopupAlertOpen(true)
            setOldPassword('')
            setNewPassword('')
            setPasswordConfirmation('')
          }
        })
        .catch(err => {
          const errorPayload = err.response.data;
          console.error(`Error: ${errorPayload.message}`);
          setPasswordConfirmationError(errorPayload.message);
        })
    }
  }

  const handleCreateNewPasswordOnClick = async () => {
    if (arePasswordsValid(undefined, newPassword, passwordConfirmation)) {
      const token = await getAccessToken()
      updatePassword(undefined, passwordConfirmation, token)
        .then(res => {
          if (res.status === 204) {
            setPopupAlertMessage('Password has been successfully updated')
            setIsPopupAlertOpen(true)
            setOldPassword('')
            setNewPassword('')
            setPasswordConfirmation('')
          }
        })
        .catch(err => {
          const errorPayload = err.response.data;
          console.error(`Error: ${errorPayload.message}`);
          setPasswordConfirmationError(errorPayload.message);
        })
    }
  }

  const handleDeleteUserAccountOnClick = async () => {
    const token = await getAccessToken()
    deleteUserAccount(token)
      .then(res => {
        if (res.status === 200) {
          window.location.href = res.data.redirect
        }
      })
      .catch(err => {
        const errorPayload = err.response.data;
        console.error(`Error: ${errorPayload.message}`);
        setPasswordConfirmationError(errorPayload.message);
      })
  }

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

              <Grid item xs={12} md={9}>
                <TextFieldWithTitle
                  placeholder=''
                  type='text'
                  title='Username'
                  handleSetState={setUsername}
                  value={username}
                  error={usernameError}
                />
              </Grid>

              <Grid item xs={12} md={3} display={'flex'} alignItems={'flex-end'} justifyContent={{xs:'start', md: 'center'}}>
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

              {hasSetPassword && (
                <>
                  <Grid item xs={12} md={9}>
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

                  <Grid item xs={12} md={3} display={'flex'} alignItems={'flex-end'} justifyContent={{xs:'start', md: 'center'}}>
                    <Button
                      variant='contained'
                      color='secondary'
                      sx={{
                        borderRadius: 100,
                        textTransform: 'none'
                      }}
                      size='large'
                      onClick={handleUpdatePasswordOnClick}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </>
              )}

              {!hasSetPassword && showPasswordForm && (
                <>
                  <Grid item xs={9}>
                    <Stack direction={'column'} spacing={2}>
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
                      onClick={handleCreateNewPasswordOnClick}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </>
              )}

              {!hasSetPassword && !showPasswordForm && (
                <Grid item xs={12} textAlign={'left'}>
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{
                      borderRadius: 100,
                      textTransform: 'none'
                    }}
                    size='large'
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Create Password
                  </Button>
                </Grid>
              )}
            </Grid>

            <Grid container rowSpacing={2} columnSpacing={0}>

              <Grid item xs={12}>
                <Typography fontSize={25} fontWeight={'bold'} textAlign={'left'}>
                  Delete Account
                </Typography>
              </Grid>

              <Grid item xs={12} md={9}>
                <Typography fontSize={15} textAlign={'left'}>
                  By deleting your account, all data in this account will be deleted permanently.
                  This <Typography component="span" fontWeight='bold'> CANNOT</Typography> be undone.
                </Typography>
              </Grid>

              <Grid item xs={12} md={3} display={'flex'} alignItems={'flex-end'} justifyContent={{xs:'start', md: 'center'}}>
                <Button
                  variant='outlined'
                  color='error'
                  sx={{
                    borderRadius: 100,
                    textTransform: 'none'
                  }}
                  size='large'
                  onClick={handleDeleteUserAccountOnClick}
                >
                  Delete Account
                </Button>
              </Grid>
            </Grid>
          </Stack>
          <PopupAlert autoHideDuration={3000} handleClose={() => setIsPopupAlertOpen(false)} open={isPopupAlertOpen} message={popupAlertMessage} type={'success'} />
        </>
      )}
    </>
  )
}
