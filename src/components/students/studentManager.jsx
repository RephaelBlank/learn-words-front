import { useEffect, useState } from 'react'
import TaskExecution from './taskExecutionUI';
import axiosInstance from '../../axiosInstance';
import ExecutionTasksList from './executionTasksList';
import Layout from '../../layout';
import LogOut from '../LogOut';

function StudentManager({setLoggedIn}) {
    const [taskExecution, setTaskExecution] = useState(null); 
    const [completedTasks, setCompletedTasks] = useState ([]); 
    const [view, setView] = useState ('deafult'); 

    const assignedTask = sessionStorage.getItem('assignedTask');

    const fetchTask = async(assignedTask) => {
      try {
         
        const  {data}  = await axiosInstance.get(`/performance/assignedTask/${assignedTask}`); 
        for (const performance of data){
          console.log (performance);
          if (performance.status === 'PENDING'){
            console.log (performance.executionID); 
             
            setTaskExecution (performance.executionID);
            break; 
          }
        }

        setCompletedTasks (data);
        
      } catch (error) {
        console.error(error); 
      }
    }
    
    useEffect(() => {
    if (assignedTask){
        fetchTask (assignedTask); 
    } }, []); 

    const handleMenuSelect = (view) => {
      setView(view); 
      setTaskExecution (null); 
      console.log (view);
    };

    const studentMenuItems = [
      { label: 'Profile', onClick: () => handleMenuSelect('profile') },
      { label: 'Tasks list', onClick: () => handleMenuSelect('tasksList') },
    ];

    const topContent = <LogOut setIsLoggedIn = {setLoggedIn}/>;
    let mainContent; 

    if (taskExecution){
    mainContent = (
      <TaskExecution executionID={taskExecution} />
  );}
  else {
    mainContent = (
      <ExecutionTasksList tasks={completedTasks}/>
    ); 
  }
    const leftContent = studentMenuItems;

    switch (view){
      case 'tasksList': 
        mainContent =  <ExecutionTasksList tasks={completedTasks}/>
    }

    return  (
    
      <Layout
        topContent={topContent}
        leftContent={leftContent}
        mainContent={mainContent}
      />
    
  );
        
  }
  
  export default StudentManager