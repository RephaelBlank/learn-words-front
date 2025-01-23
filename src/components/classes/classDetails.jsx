import { useEffect, useState } from 'react';
import axios from 'axios';

function ClassDetails({ selectedClass, onBack }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [allTasks, setAllTasks] = useState([]); 
  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); 

  const [taskToSend, setTaskToSend] = useState(null); 
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    async function fetchClassDetails() {
      try {
        const { data } = await axios.get(`http://localhost:3000/classes/${selectedClass.classID}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setStudents(data.students);
        setAssignments(data.assignedTasks);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClassDetails();

}, [selectedClass]);

    const fetchTasks = async() => {
      try {
        const  {data}  = await axios.get('http://localhost:3000/tasks'); 
        setAllTasks(data); 
        console.log (data);
      } catch (error) {
        console.error(error); 
      }
    }

    const assignTask = async() => {
        try {
            console.log(token); 
            const taskID = selectedTaskID || 1; 
            const classID = selectedClass.classID;
            const response = await axios.post('http://localhost:3000/teachers/assign', {
                resourceType: "class",
                classID,
                taskID
            },
                {
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              });
            console.log('Task assigned successfully:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
      };

    const handleTaskSelection = async (task) => {
      const id = task.taskID;
      setSelectedTaskID(id); 
      try{
          const {data} = await axios.get(`http://localhost:3000/tasks/${id}`); 
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
        const response = await axios.post('http://localhost:3000/teachers/send', {taskID,
          resourceType: "assignedTask",
          
          },
          {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        console.log('Task send successfully:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
      
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
            {assignment.tasks.taskName}</li>
        ))}
      </ul>

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
            <ul>
              {selectedTask.words.map((word) => (
                <li key={word.wordID}>{word.wordName}</li>
              ))}
            </ul>
          ) : (
            <p>Task details loaded, but not a list</p>
          )
        ) : (
          <p>Select a task to see details</p>
        )}
        <button onClick={assignTask}>Assign Task</button>
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
