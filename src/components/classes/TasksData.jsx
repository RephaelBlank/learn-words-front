import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function TasksData({ assignments }) {
  const [taskToSend, setTaskToSend] = useState(null); 
 
  const [taskLink, setTaskLink] = useState(null);

  const URL = import.meta.env.VITE_WEB_URL;

    const sendTask = async () => {
      try {
        const taskID = taskToSend.assignedID;
        console.log(taskToSend);  
        console.log (taskID); 
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
 

  return (
    <div>
      <h3>Assignments:</h3>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.assignedID} onClick={() => setTaskToSend(assignment)}>
            {assignment.tasks.taskName}
            <button onClick={() => getTaskLink(assignment.assignedID)}>
            Get Task Link
            </button>
            </li>
        ))}
      </ul>

      {taskLink && (
        <div>
          <p>Task Link: <a href={taskLink} target="_blank" rel="noopener noreferrer">{taskLink}</a></p>
          <button onClick={closeLink}>Close</button>
        </div>
      )}

      {taskToSend? (
        <>
        <button onClick={sendTask}>Send Task</button>
        </>
      ):(<></>)}
    </div>
  );
}

export default TasksData;
