import { Box, Button, Grid, Typography, Link } from '@mui/material';
import React from 'react';
import DynamicTypeAnimation from '../components/DynamicTypeAnimation';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {

  const navigate = useNavigate()

  const mainTypographyFontSize = {
    xl: '4.8rem',
    lg: '3.2rem',
    md: '2.45rem',
    sm: '1.7rem',
    xs: '2.5rem'
  }

  const buttonFontSize = {
    xl: '2.0rem',
    lg: '1.345rem',
    md: '1.02rem',
    sm: '0.72rem',
    xs: '1.1rem'
  }

  const margins = {
    xl: 16,
    lg: 14,
    md: 10,
    sm: 6,
    xs: 6
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={6}>
        <Box minHeight={'100vh'} alignItems={'center'} display={'flex'}>
          <Box p={margins}>
            <Typography
              variant='h2'
              textAlign={'left'}
              fontWeight={'bold'}
              lineHeight={1.5}
              fontSize={mainTypographyFontSize}
            >
              Generate Links
            </Typography>
            <Typography
              variant='h2'
              textAlign={'left'}
              fontWeight={'bold'}
              lineHeight={1.5}
              fontSize={mainTypographyFontSize}
            >
              Which are
            </Typography>
            <DynamicTypeAnimation fontSize='5rem' viewport='xl'/>
            <DynamicTypeAnimation fontSize='3.5rem' viewport='lg'/>
            <DynamicTypeAnimation fontSize='2.7rem' viewport='md'/>
            <DynamicTypeAnimation fontSize='2rem' viewport='sm'/>
            <DynamicTypeAnimation fontSize='2.8rem' viewport='xs'/>
            <Typography
              color={'#003a66'}
              mt={6}
              textAlign={'left'}
              variant='h5'
              fontSize={buttonFontSize}
            >
              Management System for your Links
            </Typography>
            <Box textAlign={'left'} mt={3}>
              <Button variant='outlined' color='secondary' sx={{ textTransform: 'none', fontSize: buttonFontSize }} size='large' onClick={() => navigate('/signup')}>
                Try me!
              </Button>
            </Box>
            <Typography textAlign={'left'} mt={2}>
                Already have a TRIMLY account?{' '}
                <Link onClick={() => navigate('/login')} sx={{cursor: 'pointer'}}>Sign In</Link>
              </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          minHeight={'100vh'}
          alignItems={'center'}
          justifyContent={'center'}
          display={{ xs: 'none', sm: 'flex' }}
        >
          <Box width={{ xs:'200px', sm: '400px', md: '500px', lg: '600px', xl: '800px' }}>
            <img alt="" src="./images/shortener.jpg" width={'100%'} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
