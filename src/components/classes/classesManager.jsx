import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ClassesList from './classesList';
import ClassDetails from './classDetails';
import TaskManager from '../tasks/taskManager';

function ClassesManager({setLoggedIn}) {
    const [classes, setClasses] = useState([]); 
    const [selectedClass, setSelectedClass] = useState(null);
    let navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect( () => {
        async function fetchData() {
            try {
                const token = sessionStorage.getItem('token'); 
                console.log (token); 
                const { data } = await axios.get(`${API_URL}/classes`, {
                    headers: ({
                        Authorization: 'Bearer ' + token
                    })
                });
                setClasses(data); 
            }
            catch (error){
                if (error.response && error.response.status === 401){ 
                    sessionStorage.removeItem('token'); 
                    setLoggedIn(false); 
                    navigate('../')
                }
                console.log(error)
            }            
        }
        fetchData();
    }, [setLoggedIn, navigate]); 


    return (
      <div>
        <h1>Welcome!</h1>
        {!selectedClass ? (
          <>
          <TaskManager  />
          <ClassesList classes={classes} onSelectClass={setSelectedClass} />
          </>
        ): (
          <ClassDetails selectedClass={selectedClass} onBack={() => setSelectedClass(null)} />
      )}
        </div>
  );
        
  }
  
  export default ClassesManager