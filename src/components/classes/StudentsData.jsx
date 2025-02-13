import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';

function StudentsData({ selectedClass,students, onBack }) {

  return (
    <div>
      <h2>{selectedClass.className}</h2>
      <h3>Students:</h3>
      <ul>
        {students.map((student) => (
          <li key={student.studentID}>{student.studentName}</li>
        ))}
      </ul>
     
      
      

     

      <button onClick={onBack}>Back to Classes</button>
    </div>
  );
}

export default StudentsData;
