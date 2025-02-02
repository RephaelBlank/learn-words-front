import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import StudentLogin from './studentLogin';

function StudentsList({ setIsLoggedIn }) {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [students, setStudents] = useState([]);

  const [taskID, setTaskID] = useState(null); 

  const location = useLocation(); 
  const params = new URLSearchParams(location.search);
  const authToken = params.get('authToken');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchStudents() {
      const { data } = await axios.get(`${API_URL}/performance/list/students?authToken=${authToken}`);
      setStudents(data.students);
      setTaskID(data.taskID); 
      sessionStorage.setItem('assignedTask', data.taskID);
    }
    fetchStudents();
  }, [selectedStudent]);

  const loggedIn = () => {
    setIsLoggedIn(true); 
  } 

  return (
    <div>
      <h1>Access Task </h1>
      <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
        <option value={null}>Select Student</option>
        {students.map((student) => (
          <option key={student.studentID} value={student.studentID}>
            {student.studentName}
          </option>
        ))}
      </select>
      {selectedStudent? (
       <StudentLogin student ={selectedStudent} taskID = {taskID} setIsLoggedIn={loggedIn}/>
      ):(<></>)}
    </div>
  );
}

export default StudentsList;