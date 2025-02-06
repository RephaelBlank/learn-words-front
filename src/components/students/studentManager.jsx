import { useEffect, useState } from 'react'
import TaskExecution from './taskExecutionUI';
import axiosInstance from '../../axiosInstance';
import ExecutionTasksList from './executionTasksList';

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

    return (
      <div>
        <h1>Welcome!</h1>
        {taskExecution ? (
          <>
          <TaskExecution executionID={taskExecution} />
          </>
        ): (<>
                  TasksExecutionList
                  <ExecutionTasksList tasks={completedTasks}/>
        </>
      )}
        </div>
  );
        
  }
  
  export default StudentManager