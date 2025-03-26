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
    } }, [view]); 

    const handleMenuSelect = (view) => {
      setView(view); 
      setTaskExecution (null); 
      if (view=== 'taskExecution' ){
        fetchTask(assignedTask);
      }
      console.log (view);
    };

    const studentMenuItems = [
      { label: 'Profile', onClick: () => handleMenuSelect('profile') },
      { label: 'Tasks list', onClick: () => handleMenuSelect('tasksList') },
      { label: 'Complete Task', onClick: () => handleMenuSelect('taskExecution') }
    ];

    const name = sessionStorage.getItem('name'); 
    const topContent =(<> <LogOut setIsLoggedIn = {setLoggedIn}/> Hello {name}! </>); 
    let mainContent; 

    if (taskExecution && view != 'tasksList'){
    mainContent = (
      <TaskExecution executionID={taskExecution} />
  );}
  else {
    mainContent = (
      <ExecutionTasksList tasks={completedTasks}/>
    ); 
  }
    const leftContent = studentMenuItems;

    

    return  (
    
      <Layout
        topContent={topContent}
        leftContent={leftContent}
        mainContent={mainContent}
      />
    
  );
        
  }
  
  export default StudentManager