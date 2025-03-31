import { useState } from 'react';
import NewTask from './newTask';

function TaskManager() {
    const [isCreatingTask, setIsCreatingTask] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(''); // Added successMessage state
  
    const openTaskCreator = () => {
      setIsCreatingTask(true); 
    };
  
    const closeTaskCreator = () => {
      setIsCreatingTask(false); 
    };

    const handleTaskCreated = (message) => { // Handle success message
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    };
  
    return (
      <div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
        {!isCreatingTask ? (
          <>
            <button onClick={openTaskCreator}>Create New Task</button>
          </>
        ) : (
          <NewTask onClose={closeTaskCreator} onTaskCreated={handleTaskCreated} /> 
        )}
      </div>
    );
  }
  
  export default TaskManager;