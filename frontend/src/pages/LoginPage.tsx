import {
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lightTheme } from '../theme/lightTheme';
import TextFieldWithTitle from '../components/TextFieldWithTitle';
import { signinUser } from '../adaptors/userAdaptor';
import { AuthContext } from '../contexts/authContext';
import { getAuthorizationUrl } from '../adaptors/sgidAdaptor';

export default function LoginPage() {
  // states
  const [isSignInButtonDisabled, setIsSignInButtonDisabled] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // navigate hook
  const navigate = useNavigate();

  // AuthContext
  const { insertToken, insertExpiry } = useContext(AuthContext);

  const handleLoginUserOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isUserDetailsValid(email)) {
      setIsSignInButtonDisabled(true)
      signinUser(email, password)
        .then((res) => {
          const responsePayload = res.data;
          insertToken(responsePayload.data.accessToken);
          insertExpiry(responsePayload.data.expiry);
          navigate('/main');
        })
        .catch((err) => {
          setIsSignInButtonDisabled(false)
          const errorPayload = err.response.data;
          console.error(`Error: ${errorPayload.message}`);
          if (errorPayload.code === 401) {
            setPasswordError(errorPayload.message);
          }
        });
    }
  };

  const isUserDetailsValid = (email: string) => {
    setEmailError('');
    setPasswordError('');
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      setEmailError('Email is not valid');
    }

    return isValid;
  };

  const handleSingpassButtonOnClick = () => {
    getAuthorizationUrl().then(res => {
      window.location.href = res.data.redirect
    })
  }

  return (
    <Grid container spacing={0}>
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
          <Box p={{ xs: 10, sm: 16 }} width={'100%'} component={'form'} onSubmit={handleLoginUserOnSubmit}>
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
                Welcome back to TRIMLY
              </Typography>
              <Stack spacing={3}>
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
                variant="contained"
                size="large"
                type='submit'
                disabled={isSignInButtonDisabled}
              >
                Sign In
              </Button>
              <Typography>
                New to TRIMLY? <Link onClick={() => navigate('/signup')} sx={{cursor: 'pointer'}}>Create Account</Link>
              </Typography>
              <Divider>OR</Divider>
              <Button
                variant="contained"
                size="large"
                onClick={handleSingpassButtonOnClick}
              >
                Sign In with
                <img
                  alt=""
                  src="./images/singpass-logo.svg"
                  width={'90px'}
                  style={{ marginLeft: '5px', paddingTop: '3px' }}
                />
              </Button>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
