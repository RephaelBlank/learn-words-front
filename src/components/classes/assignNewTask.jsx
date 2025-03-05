import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

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
        {allTasks.length !== 0 ? (
          <>
            <Typography variant="h6">Assign Task:</Typography>
  
          
            <List>
              {allTasks.map((task) => (
                <ListItem 
                  key={task.taskID} 
                  onClick={() => handleTaskSelection(task)}
                  button 
                >
                  <ListItemText primary={task.taskName} />
                </ListItem>
              ))}
            </List>
  
         
            {selectedTask ? (
              Array.isArray(selectedTask.words) ? (
                <><Typography variant="body1">Words:</Typography>
                  <List>
                    {selectedTask.words.map((word) => (
                      <ListItem key={word.wordID}>
                        <ListItemText primary={word.wordName} />
                      </ListItem>
                    ))}
                  </List>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={assignTask}
                    sx={{ mt: 2 }}
                  >
                    Assign Task
                  </Button>
                </>
              ) : (
                <Typography variant="body1">Task details loaded, but not a list</Typography>
              )
            ) : (
              <Typography variant="body2">Select a task to see details</Typography>
            )}
          </>
        ) : (
          <Button
            variant="contained" 
            color="secondary" 
            onClick={fetchTasks}
          >
            Assign New Task
          </Button>
        )}
      </div>
    );
  }


export default AssignNewTask;
