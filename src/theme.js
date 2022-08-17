import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "rgba(255, 255, 255, 1)",
      paper: "rgba(255, 255, 255, 0.6)"
    }
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "rgba(18, 18, 18, 1)",
      paper: "rgba(18, 18, 18, 0.4)",
    },
    typography: {
      h6: {
        color: "#FFFFFF"
      }
    }
  },

});

