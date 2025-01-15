import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"



function SignIn({setIsLoggedIn}) {
    const [errorMessage, setErrorMessage] = useState('')
    let navigate = useNavigate();


    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const form = {
        teacherID: formData.get('id'),
        password: formData.get('password')
      };
      
      try {
        const { data } = await axios.post("http://localhost:3000/auth/login", form,
          { withCredentials: true }
        );
        setIsLoggedIn(true)
        navigate('../')
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
            name="id"
            placeholder="id"
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
          <button
            type="submit"
            style={{
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  }
  
  export default SignIn