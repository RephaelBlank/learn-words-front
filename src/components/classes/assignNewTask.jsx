import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

function AssignNewTask({ selectedClass, onAddAssignment }) {
 
  const [allTasks, setAllTasks] = useState([]); 
  const [selectedTaskID, setSelectedTaskID] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); 

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
        onAddAssignment(); 
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

    
  return (
    <div>

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

      

     

    
    </div>
  );
}

export default AssignNewTask;
