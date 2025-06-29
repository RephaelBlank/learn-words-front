import { useEffect, useState } from 'react'
import {  BrowserRouter,  Routes,  Route,} from "react-router-dom"
import SignIn from './components/SignIn'
import Home from './components/home'
import Cookies from 'js-cookie'
import ClassesManager from './components/classes/classesManager'
import SignUp from './components/signUp'
import StudentsList from './components/students/studentsList'
import TaskExecution from './components/students/taskExecutionUI'
import StudentManager from './components/students/studentManager'
import Layout from './layout'
import AuthViews from './components/AuthView'
import LogOut from './components/LogOut'

function App() {
  const [isLoggedIn, setLoggedIn ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState (null);

  const [activeView, setActiveView] = useState('default');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token){
      console.log(token);
      setLoggedIn(true)
      const storedRole = sessionStorage.getItem('role'); 
      setRole (storedRole); 
    }
    setLoading(false); 
  }); 
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <BrowserRouter> 
       <Routes>
        <Route path="/" 
          element=  {<Layout
            topContent={<div>Welcome!!</div>}
            leftContent={null}
            mainContent={<AuthViews setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}
          />}
        />
        <Route path ="/enter-students" 
          element=  {<Layout
            topContent={<div>Welcome!!</div>}
            leftContent={null}
            mainContent={<StudentsList setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}
        />}
      />
       </Routes>
      </BrowserRouter>
      
    );
  }

  const name = sessionStorage.getItem('name'); 
  const topContent =(<> <LogOut setIsLoggedIn = {setLoggedIn}/> Hello {name}! </>); 
console.log (name);
  let mainContent;
  let leftContent;

  if (role === 'teacher') {
    return( <ClassesManager setLoggedIn={setLoggedIn}/>);
  } else if (role === 'student') {
    return(<StudentManager setLoggedIn={setLoggedIn}/>)
  } else {
    // אם התפקיד לא מוגדר – נציג ממשק ברירת מחדל
    mainContent = <Home setLoggedIn={setLoggedIn} />;
    leftContent = <div>תפריט צד כללי</div>;
  }

  return (
    
      <Layout
        topContent={topContent}
        leftContent={leftContent}
        mainContent={mainContent}
      />
    
  );
}




export default App
