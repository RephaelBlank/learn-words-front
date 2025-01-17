import { useState } from 'react';
import NewTask from './newTask';

function TaskManager() {
    const [isCreatingTask, setIsCreatingTask] = useState(false); 
  
    const openTaskCreator = () => {
      setIsCreatingTask(true); 
    };
  
    const closeTaskCreator = () => {
      setIsCreatingTask(false); 
    };
  
    return (
      <div>
        {!isCreatingTask ? (
          <>
            <h3>Task List</h3>
           
            <button onClick={openTaskCreator}>Create New Task</button>
          </>
        ) : (
          <NewTask onClose={closeTaskCreator} />
        )}
      </div>
    );
  }
  
  export default TaskManager;