import { useEffect, useState } from 'react'
import TaskExecution from './taskExecutionUI';
import axiosInstance from '../../axiosInstance';
import ExecutionTasksList from './executionTasksList';
import Layout from '../../layout';
import { Button } from '@mui/material';

function StudentManager({setLoggedIn}) {
    const [taskExecution, setTaskExecution] = useState(null); 
    const [completedTasks, setCompletedTasks] = useState ([]); 

    const assignedTask = sessionStorage.getItem('assignedTask');

    const fetchTask = async(assignedTask) => {
      try {
        let flag = true; 
        const  {data}  = await axiosInstance.get(`/performance/assignedTask/${assignedTask}`); 
        for (const performance of data){
          console.log (performance);
          if (performance.status === 'PENDING'){
            console.log (performance.executionID); 
            flag = false; 
            setTaskExecution (performance.executionID);
            break; 
          }
        }
        
        if (flag){
        setCompletedTasks (data);
        }
      } catch (error) {
        console.error(error); 
      }
    }
    
    useEffect(() => {
    if (assignedTask){
        fetchTask (assignedTask); 
    } }, []); 

    const leftContent = (
      <>
        <h2>מטלות נוספות</h2>
        <ExecutionTasksList tasks={completedTasks} />
      </>
    );
  
    const mainContent = (
      <>
        <h1>Welcome!</h1>
        {taskExecution ? (
          <TaskExecution executionID={taskExecution} />
        ) : (
          <>
            <p>TasksExecutionList</p>
            <ExecutionTasksList tasks={completedTasks} />
          </>
        )}
      </>
    );

    const topContent = (<> This is Top
    </>)
  
    return (
      <Layout topContent={topContent} leftContent={leftContent} mainContent={mainContent}  />
    );
  }
  
  export default StudentManager