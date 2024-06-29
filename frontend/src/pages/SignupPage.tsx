import { Box, Button, Grid, Link, Stack, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lightTheme } from '../theme/lightTheme';
import TextFieldWithTitle from '../components/TextFieldWithTitle';
import { registerUser, signinUser } from '../adaptors/userAdaptor';
import { AuthContext } from '../contexts/authContext';

export default function SignupPage() {
  // States
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // navigate hook
  const navigate = useNavigate();

  // AuthContext
  const { setAuthState } = useContext(AuthContext);

  // Functions
  const handleRegisterUserOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isUserDetailsValid(username, email, password)) {
      setIsSignUpButtonDisabled(true)
      registerUser(username, email, password)
        .then(async (res) => {
          const responsePayload = res.data;
          if (responsePayload.code === 201) {
            const signinResponse = await signinUser(email, password);
            setAuthState(signinResponse.data.data.accessToken);
            navigate('/main');
          }
        })
        .catch((err) => {
          setIsSignUpButtonDisabled(false)
          const errorPayload = err.response.data;
          console.error(`Error: ${errorPayload.message}`);
          if (errorPayload.code === 409) {
            setEmailError(errorPayload.message);
          }
        });
    }
  };

  /**
   * A helper function which validates the user's username, email and password
   * @param username The user's desired username
   * @param email The user's email
   * @param password The user's password
   * @returns
   */
  const isUserDetailsValid = (
    username: string,
    email: string,
    password: string
  ) => {
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (username.length < 8) {
      isValid = false;
      setUsernameError('Username must be at least 8 characters');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      setEmailError('Email is not valid');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
      isValid = false;
      setPasswordError(
        'Password must be at least 8 characters with at least 1 uppercase letter and 1 lowercase letter'
      );
    }

    return isValid;
  };

  return (
    <Grid container spacing={0} component={'form'} onSubmit={handleRegisterUserOnSubmit}>
      <Grid item xs={0} sm={2} md={4} lg={6} sx={{ bgcolor: lightTheme.palette.primary.main }}>
        <Box
          minHeight={'100vh'}
          alignItems={'center'}
          justifyContent={'center'}
          display={{ xs: 'none', sm: 'flex' }}
        >
          <Box
            width={'100%'}
            p={{ xs: 10, sm: 16 }}
            display={'flex'}
            justifyContent={'center'}
          >
            <Box width={{ sm: '64px', md: '256px', lg: '512px' }}>
              <img alt="" src="./images/programming.png" width={'100%'} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Box minHeight={'100vh'} alignItems={'center'} display={'flex'}>
          <Box p={{ xs: 10, sm: 16 }} width={'100%'}>
            <Stack spacing={7}>
              <Typography
                variant="h4"
                fontWeight={'bold'}
                fontSize={{
                  xs: '1.50rem',
                  sm: '1.50rem',
                  md: '1.75rem',
                  lg: '2.125rem'
                }}
              >
                Welcome to TRIMLY
              </Typography>
              <Stack spacing={3}>
                <TextFieldWithTitle
                  title="Username"
                  placeholder="example"
                  type="text"
                  handleSetState={setUsername}
                  value={username}
                  error={usernameError}
                />
                <TextFieldWithTitle
                  title="Email Address"
                  placeholder="example@gmail.com"
                  type="email"
                  handleSetState={setEmail}
                  value={email}
                  error={emailError}
                />
                <TextFieldWithTitle
                  title="Password"
                  placeholder="Enter Password"
                  type="password"
                  handleSetState={setPassword}
                  value={password}
                  error={passwordError}
                />
              </Stack>
              <Button
                type='submit'
                variant="contained"
                size="large"
                disabled={isSignUpButtonDisabled}
              >
                Sign up
              </Button>
              <Typography>
                Already have a TRIMLY account?{' '}
                <Link href="/login">Sign In</Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
