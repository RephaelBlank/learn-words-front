import { useEffect, useState } from 'react'
import {  BrowserRouter,  Routes,  Route,} from "react-router-dom"
import SignIn from './components/SignIn'
import Home from './components/home'
import Cookies from 'js-cookie'

function App() {
  const [isLoggedIn, setLoggedIn ] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const token = Cookies.get('access_token');
    if (token){
      setLoggedIn(true);
    }
    setLoading(false);
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <BrowserRouter>{
      isLoggedIn? 
    <Routes>
    <Route path="/" element={<Home  setLoggedIn={setLoggedIn} />} />
    </Routes>
    :
    <Routes>
        <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />} />
    </Routes>
}
    </BrowserRouter>
    </>
  )
}

export default App
