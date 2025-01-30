import { useEffect, useState } from 'react'
import {  BrowserRouter,  Routes,  Route,} from "react-router-dom"
import SignIn from './components/SignIn'
import Home from './components/home'
import Cookies from 'js-cookie'
import ClassesManager from './components/classes/classesManager'
import SignUp from './components/signUp'
import StudentsList from './components/students/studentsList'

function App() {
  const [isLoggedIn, setLoggedIn ] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = sessionStorage.getItem('token');
  if (token){
    console.log(token);
    setLoggedIn(true)
  }
  setLoading(false); 
}); 
  if (loading) {
    return <div>Loading...</div>;
}


  return (
    <>
    <BrowserRouter>{
      isLoggedIn? 
    <Routes>
    <Route path="/" element={<Home  setLoggedIn={setLoggedIn} />} />
    <Route path="/class" element={<ClassesManager  setLoggedIn={setLoggedIn} />} />
    </Routes>
    :
    <Routes>
        <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />} />
        <Route path="/sign-up" element={<SignUp setIsLoggedIn={setLoggedIn}  />} />
        <Route path="/enter-students" element={<StudentsList setIsLoggedIn={setLoggedIn}  />} />
    </Routes>
}
    </BrowserRouter>
    </>
  )
}

export default App
