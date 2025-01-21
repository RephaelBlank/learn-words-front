import { useEffect, useState } from 'react';
import axios from 'axios';

function ClassDetails({ selectedClass, onBack }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [allTasks, setAllTasks] = useState([]); 
  const [selectedTaskID, setSelectedTaskID] = useState(null);
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

    const handleTaskSelection = (task) => {
        setSelectedTaskID(task.taskID); 
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
          <li key={assignment.taskID}>{assignment.tasks.taskName}</li>
        ))}
      </ul>

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
