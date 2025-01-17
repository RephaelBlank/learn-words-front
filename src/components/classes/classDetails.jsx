import { useEffect, useState } from 'react';
import axios from 'axios';

function ClassDetails({ selectedClass, onBack }) {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [allTasks, setAllTasks] = useState([]); 
  const [selectedTaskID, setSelectedTaskID] = useState(null);

  useEffect(() => {
    async function fetchClassDetails() {
      try {
        const token = sessionStorage.getItem('token');
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

    

  
  });

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

     

      <button onClick={onBack}>Back to Classes</button>
    </div>
  );
}

export default ClassDetails;
