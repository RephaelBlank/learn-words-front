import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';

function NewClass ({onClose}) {
    const [studentsNames, setStudentsNames] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [className, setClassName] = useState("");

    const addStudent = () => {
        if (studentName.trim()) {
          setStudentsNames([...studentsNames, studentName.trim()]);
          setStudentName("");
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
    
        // Data to send
        const formData = {
          className: className.trim(),
          teacherID: Number(sessionStorage.getItem('id')),
          studentsNames,
          resourceType: "teacher",
        };
    
        try{ 
            const {response} = await axiosInstance.post(`/classes`,formData);
        } catch(error){
            console.log(error); 
        }
        onClose(); 
      };

    return (
        <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Create Class</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Class Name:</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
         
          <div className="mb-4">
            <label className="block font-semibold mb-2">Student Name:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="border rounded px-3 py-2 flex-grow"
              />
              <button
                type="button"
                onClick={addStudent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Students List:</h2>
            <ul className="list-disc pl-5">
              {studentsNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button onClick={onClose} className="close-form-button"></button>
        </form>
      </div>
    );
};

export default NewClass;