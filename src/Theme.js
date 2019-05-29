import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#013f8c',
    },
    secondary: {
      main: '#08d353',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

if (process.env.NODE_ENV === 'development') {
  console.info('Theme:', theme);
}

export default function ThemeProvider({ children }) {
  return (
    <>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </>
  );
}
