import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins/400.css';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
    'rounded-contained': true;
  }
}

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1670,
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3144df'
    },
    secondary: {
      main: '#003a66'
    }
  },
  typography: {
    fontFamily: 'Poppins',
    subtitle2: {
      fontSize: '0.75rem',
      color: 'gray'
    }
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
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 100
        }
      }
    }
  }
});
