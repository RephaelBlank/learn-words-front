import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function TasksData({ assignments }) {
  const [taskToSend, setTaskToSend] = useState(null); 
 
  const [taskLink, setTaskLink] = useState(null);

  const URL = import.meta.env.VITE_WEB_URL;

    const sendTask = async () => {
      try {
        const taskID = taskToSend;
         
        const response = await axiosInstance.post(`/teachers/send`, {taskID,
          resourceType: "assignedTask",
          
          });
        console.log('Task send successfully:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
      setTaskToSend(null); 
    }; 

    const getTaskLink = async (assignedID) => {
      try {
        const { data } = await axiosInstance.get(`/auth/assignedTask/${assignedID}`);
        const generatedLink = `${URL}/enter-students?authToken=${data}`;
        setTaskLink(generatedLink);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert('Task has not been sent yet!');
        } else {
          console.error('Error:', error);
        }
      }
    };

    const closeLink = () => {
      setTaskLink(null); 
    };

    const handleTaskClick = (assignedID) => {
      setTaskToSend((prevID) => (prevID === assignedID ? null : assignedID));
    }

  return (
    <div>
      <h3>Assignments:</h3>
      <ul>
        {assignments.map((assignment) => (
          <li 
          className="clickable-item"
          key={assignment.assignedID} 
          onClick={() => handleTaskClick(assignment.assignedID)}
          style={{ cursor: 'pointer', marginBottom:  taskToSend === assignment.assignedID ? '10px' : '6px' }}>
            {assignment.tasks.taskName}
            {taskToSend === assignment.assignedID && (<>
                <button onClick={() => getTaskLink(assignment.assignedID)}>
                Get Task Link
                </button>
                
                <button onClick={sendTask}>Send Task</button>
                </>
            )}
            
            </li>
        ))}
      </ul>

      {taskLink && (
        <div>
          <p>Task Link: <a href={taskLink} target="_blank" rel="noopener noreferrer">{taskLink}</a></p>
          <button onClick={closeLink}>Close</button>
        </div>
      )}

     
    </div>
  );
}

export default TasksData;
