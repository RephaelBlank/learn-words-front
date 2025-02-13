import { useEffect, useState } from 'react'
import axios from 'axios'

import ClassesList from './classesList';
import TaskManager from '../tasks/taskManager';
import axiosInstance from '../../axiosInstance';
import CreateClassManager from './createClassManager';
import LogOut from '../LogOut';
import Layout from '../../layout';
import StudentsData from './StudentsData';
import TasksData from './TasksData';
import AssignNewTask from './assignNewTask';

function ClassesManager({setLoggedIn, resetSelectedClass}) {
    const [classes, setClasses] = useState([]); 
    const [selectedClass, setSelectedClass] = useState(null);
    const [view, setView] = useState ('deafult'); 

    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);

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

    async function fetchClassDetails() {
      if (selectedClass){
      try {
        const { data } = await axiosInstance.get(`/classes/${selectedClass.classID}`);
        setStudents(data.students);
        setAssignments(data.assignedTasks);
      } catch (error) {
        console.error(error);
      }}
      }  

    useEffect( () => {
        fetchData();
    }, [setLoggedIn]);
    
    useEffect( () => {
      fetchClassDetails();
    }, [selectedClass])

    const addAssignment = () => {
      fetchClassDetails(); 
    };

    const handleMenuSelect = (view) => {
      setView(view);
      setSelectedClass(null); 
      console.log (view);
    };

    const teacherMenuItems = [
      { label: 'Classes', onClick: () => handleMenuSelect('classes') },
      { label: 'Create Task', onClick: () => handleMenuSelect('tasks') },
    ];

    const topContent = <LogOut setIsLoggedIn = {setLoggedIn}/>;
    let mainContent; 

    if (selectedClass){
      mainContent = (<>
       <StudentsData 
      selectedClass={selectedClass} 
      students={students} 
      onBack={() => setSelectedClass(null)}
    />
    <TasksData assignments={assignments} />
    <AssignNewTask selectedClass={selectedClass} onAddAssignment={addAssignment}/>
      </>);}
  else {
    mainContent = (
      <>
      <CreateClassManager onClassCreated={fetchData}/>
      <ClassesList classes={classes} onSelectClass={setSelectedClass} />
      </>
    ); 
  }
    const leftContent = teacherMenuItems;

    if (view === 'tasks')
      mainContent = (<TaskManager  />); 

  return (
    
    <Layout
      topContent={topContent}
      leftContent={leftContent}
      mainContent={mainContent}
    />
  
);
        
  }
  
  export default ClassesManager