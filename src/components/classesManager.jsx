import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function ClassesManager({setLoggedIn}) {
    const [classes, setClasses] = useState([]); 
    const [selectedClass, setSelectedClass] = useState(null);
    let navigate = useNavigate();

    useEffect( () => {
        async function fetchData() {
            try {
                const token = sessionStorage.getItem('token'); 
                console.log (token); 
                const { data } = await axios.get("http://localhost:3000/classes", {
                    headers: ({
                        Authorization: 'Bearer ' + token
                    })
                });
                setClasses(data); 
            }
            catch (error){
                if (error.response && error.response.status === 401){ 
                    sessionStorage.removeItem('token'); 
                    setLoggedIn(false); 
                    navigate('../')
                }
                console.log(error)
            }            
        }
        fetchData();
    }, [setLoggedIn]); 

    const fetchClassDetails = async (classID) => {
        try {
          const token = sessionStorage.getItem('token');
          const { data } = await axios.get(`http://localhost:3000/classes/${classID}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          setSelectedClass(data); 
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <>
        <h1>Welcome!</h1>
        {!selectedClass ? (
          <ul>
            {classes.map((cls) => (
              <li key={cls.classID}>
                <button onClick={() => fetchClassDetails(cls.classID)}>{cls.className}</button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <h2>{selectedClass.className}</h2>
            <h3>Students:</h3>
            <ul>
              {selectedClass.students.map((student) => (
                <li key={student.studentID}>{student.studentName}</li>
              ))}
            </ul>
            <h3>Assignments:</h3>
            <ul>
            {selectedClass.assignedTasks.map((assignment) => (
              <li key={assignment.taskID}>{assignment.tasks.taskName}</li>
            ))}
            </ul>
            
            <button onClick={() => setSelectedClass(null)}>Back to Classes</button>
          </div>
        )}
      </>
    )
  }
  
  export default ClassesManager