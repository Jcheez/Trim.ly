import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins/400.css';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3144df'
    }
  },
  typography: {
    fontFamily: 'Poppins'
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          height: '80px'
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: {variant: 'rounded'},
          style: {
            borderRadius: '100px',
            color: '#003a66',
            textTransform: 'none',
            fontSize: 15,
          }
        }
      ]
    }
  }
});
