import { ThemeProvider } from '@emotion/react';
import {createTheme, Palette} from '@mui/material/styles'
import React, { useState } from 'react';
// import { theme } from '../theme';
import './App.css';
import { Notification } from './Notification';
import { ButtonStyled } from './Styled';
const theme = createTheme({
  palette: {
    warning: {
      main: '#ffa726'
    },
    info: {
      main: '#81d4fa',
    },
    error: {
      main: '#ef5350',
    },
    success: {
      main: '#66bb6a',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#40c4ff',
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

function App() {
  const [show, setShow] = useState(false);
  const handleShowNotification = () => setShow(true);
  const handleCloseNotification = () => {
    setShow(false);
  }
  console.log('show', show);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Notification
          title="Warning" 
          message='some descriptions'
          position="center" 
          variant="outlined"
          severity="warning"
          onCloseNotification={handleCloseNotification}
          isShowNotification={show}
          color="warning.main"
        />
        <ButtonStyled color="error" onClick={handleShowNotification}>show notification</ButtonStyled>
      </div>
    </ThemeProvider>
  );
}

export default App;
