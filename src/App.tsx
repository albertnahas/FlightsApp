import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import './App.css';
import FlightsSearch from './components/FlightsSearch/FlightsSearch';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(0, 152, 130)',
      },
      secondary: {
        main: '#ccc',
      },
    },
    typography: {
      fontSize: 13,
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '15px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FlightsSearch />
    </ThemeProvider>

  );
}

export default App;
