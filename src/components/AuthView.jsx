import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button, Link } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './signUp';

const AuthViews = ({setIsLoggedIn}) => {
  const [view, setView] = useState("signIn");

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {view === 'signIn' ? (
        <Box sx={{ mt: 2 , textAlign: 'center'}}>
          <SignIn setIsLoggedIn={setIsLoggedIn}/>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <Link
                component="button"
                variant="body2"
                onClick={() => setView('signUp')}
              >
                Don't have an account? Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      ):(
     
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <SignUp setIsLoggedIn={setIsLoggedIn}/>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <Link
                component="button"
                variant="body2"
                onClick={() => setView('signIn')}
              >
                Already have an account? Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AuthViews;
