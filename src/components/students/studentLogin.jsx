import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Button, Grid2, Link } from '@mui/material'

function StudentLogin({student, taskID ,setIsLoggedIn}) {
    const [errorMessage, setErrorMessage] = useState('')
    let navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
        studentID: student,
        password: formData.get('password')
      };
      try {
        const { data } = await axios.post(`${API_URL}/auth/students-login`, form);
        sessionStorage.setItem('token', data.access_token);   
        sessionStorage.setItem('id', student);   
        sessionStorage.setItem('role', "student");
        sessionStorage.setItem('name',data.name); 
        setIsLoggedIn();
        //navigate('../student'); 
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
  
  export default StudentLogin