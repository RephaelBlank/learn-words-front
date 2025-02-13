import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import ExecutionTasksList from '../students/executionTasksList';

function StudentsData({ selectedClass,students, onBack }) {
    const [selectedStudent, setSelectedStudent] = useState(null); 

    const [studentTasks, setStudentTasks] = useState([]); 

    const fetchTasks = async() => {
        try {
          const  {data}  = await axiosInstance.get(`/performance/student/${selectedStudent.studentID}`);  
          setStudentTasks (data);
        } catch (error) {
          console.error(error); 
        }
      }
      
      useEffect(() => {
      if (selectedStudent){
          fetchTasks (); 
      } }, [selectedStudent]);

  return (
    <div>
      <h2>{selectedClass.className}</h2>
      {selectedStudent? (<>
      {selectedStudent.studentName} 
      {studentTasks.length>0? ( <ExecutionTasksList tasks={studentTasks} />):(<></>)}
      
      </>):
      (<><h3>Students:</h3>
      <ul>
        {students.map((student) => (
          <li key={student.studentID} onClick={() => setSelectedStudent(student)}>
            {student.studentName}</li>
        ))}
      </ul></>
)}
           

      <button onClick={onBack}>Back to Classes</button>
    </div>
  );
}

export default StudentsData;
