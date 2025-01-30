import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

function ClassDetails({ selectedClass, onBack }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [allTasks, setAllTasks] = useState([]); 
  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); 

  const [taskToSend, setTaskToSend] = useState(null); 
  const token = sessionStorage.getItem('token');
  const [taskLink, setTaskLink] = useState(null);

  const URL = import.meta.env.VITE_WEB_URL;

  useEffect(() => {
    fetchClassDetails();

}, [selectedClass]);

  async function fetchClassDetails() {
    try {
      const { data } = await axiosInstance.get(`/classes/${selectedClass.classID}`);
      setStudents(data.students);
      setAssignments(data.assignedTasks);
    } catch (error) {
      console.error(error);
    }
    }

    const fetchTasks = async() => {
      try {
        const  {data}  = await axiosInstance.get(`/tasks`); 
        setAllTasks(data); 
        console.log (data);
      } catch (error) {
        console.error(error); 
      }
    }

    const assignTask = async() => {
        try {
            console.log(token); 
            const taskID = selectedTaskID; 
            const classID = selectedClass.classID;
            const response = await axiosInstance.post(`/teachers/assign`, {
                resourceType: "class",
                classID,
                taskID
            });
            console.log('Task assigned successfully:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        setSelectedTaskID(null); 
        setSelectedTask(null); 
        setAllTasks([]); 
        fetchClassDetails();
    };

    const handleTaskSelection = async (task) => {
      const id = task.taskID;
      setSelectedTaskID(id); 
      try{
          const {data} = await axiosInstance.get(`/tasks/${id}`); 
          setSelectedTask(data); 
        } catch (error) {
          console.error('Error:', error);
        }
    };

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
      <h2>{selectedClass.className}</h2>
      <h3>Students:</h3>
      <ul>
        {students.map((student) => (
          <li key={student.studentID}>{student.studentName}</li>
        ))}
      </ul>
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

      {allTasks.length!==0? (
        <>
        <h3>Assign Task:</h3>

        <ul>
        {allTasks.map((task) => (
          <li key={task.taskID} onClick={() => handleTaskSelection(task)}>
            {task.taskName}
          </li>
        ))}
      </ul>
      {selectedTask ? (
          Array.isArray(selectedTask.words) ? (
            <>
            <ul>
              {selectedTask.words.map((word) => (
                <li key={word.wordID}>{word.wordName}</li>
              ))}
            </ul>
             <button onClick={assignTask}>Assign Task</button>
             </>
          ) : (
            <p>Task details loaded, but not a list</p>
          )
        ) : (
          <p>Select a task to see details</p>
        )}
       
        </>
      ): (
        <button onClick={fetchTasks}>Assign New Task</button>
      )


      }

      

     

      <button onClick={onBack}>Back to Classes</button>
    </div>
  );
}

export default ClassDetails;
