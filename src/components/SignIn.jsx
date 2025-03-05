import { useState } from 'react'
import axios from 'axios'

import { Button, Grid2, Link } from '@mui/material'



function SignIn({setIsLoggedIn}) {
    const [errorMessage, setErrorMessage] = useState('')
    

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
        teacherEmail: formData.get('email'),
        password: formData.get('password')
      };
      
      try {
        const { data } = await axios.post(`${API_URL}/auth/login`, form);
        setIsLoggedIn(true)
        console.log (data);
        sessionStorage.setItem('token', data.access_token);  
        sessionStorage.setItem('id', formData.get('id'));
        sessionStorage.setItem('role', "teacher");        
        sessionStorage.setItem('name',data.name); 
        
      } catch (error){
        if (error.response && error.response.status === 401) {
          console.log(error.response.data.message);
          setErrorMessage(error.response.data.message); 
        } else {
          console.error('An unexpected error occurred:', error);
          setErrorMessage('Something went wrong. Please try again.');
        }
      }
    }

    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type='email'
            name="email"
            placeholder="email"
            required
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <Button variant='contained' color='primary'
            type="submit">
            
            Submit
          </Button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  }
  
  export default SignIn