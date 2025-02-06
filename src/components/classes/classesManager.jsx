import { useEffect, useState } from 'react'
import axios from 'axios'

import ClassesList from './classesList';
import ClassDetails from './classDetails';
import TaskManager from '../tasks/taskManager';
import axiosInstance from '../../axiosInstance';
import CreateClassManager from './createClassManager';

function ClassesManager({setLoggedIn}) {
    const [classes, setClasses] = useState([]); 
    const [selectedClass, setSelectedClass] = useState(null);
   
    const API_URL = import.meta.env.VITE_API_URL;

    async function fetchData() {
        try {
            const token = sessionStorage.getItem('token'); 
            console.log (token); 
            const { data } = await axiosInstance.get(`/classes`);
            setClasses(data); 
        }
        catch (error){
            if (error.response && error.response.status === 401){ 
                sessionStorage.removeItem('token'); 
                setLoggedIn(false); 
            }
            console.log(error)
        }            
    }

    useEffect( () => {
        fetchData();
    }, [setLoggedIn]); 

    return (
      <div>
        <h1>Welcome!</h1>
        {!selectedClass ? (
          <>
          <TaskManager  />
          <CreateClassManager onClassCreated={fetchData}/>
          <ClassesList classes={classes} onSelectClass={setSelectedClass} />
          </>
        ): (
          <ClassDetails selectedClass={selectedClass} onBack={() => setSelectedClass(null)} />
      )}
        </div>
  );
        
  }
  
  export default ClassesManager