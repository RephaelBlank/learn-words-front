import { Button, Grid2, Link } from '@mui/material'



function LogOut({setIsLoggedIn}) {

    const handleLogout = async () => {
        console.log ("press"); 
      sessionStorage.clear();
      setIsLoggedIn(false);
    }

    return (
        <Button variant="outlined" color='secondary' onClick={() => handleLogout()}>
        Log-Out
      </Button>
    );
  }
  
  export default LogOut