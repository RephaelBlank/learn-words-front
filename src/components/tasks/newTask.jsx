import { useState } from 'react';
import   WordInput  from './wordInput';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';


function NewTask({ onClose }) {
  const [selectedWords, setSelectedWords] = useState([]);
  const [taskName, setTaskName] = useState ('');
  
  const API_URL = import.meta.env.VITE_API_URL;

  const addWordToTask = (word) => {
    if (selectedWords.find((w) => w.wordID === word.wordID)) {
      alert('Word is already in the task!');
      return;
    }
    console.log(word);
    setSelectedWords([...selectedWords, word]);
  };

  const removeWordFromTask = (wordId) => {
    setSelectedWords(selectedWords.filter((word) => word.wordID !== wordId));
  };

  const handleNameChange = (e) => {
    setTaskName(e.target.value); 
  }

  const createTask = async() => {
    if (selectedWords.length === 0) {
      alert('Please select at least one word before creating the task!');
      return;
    }
    if (!taskName.trim()) {
        alert('Please provide a name for the task!');
        return;
      }
    try {
        const response = await axiosInstance.post(`/tasks`, {
          taskName,
          taskWords: selectedWords.map((word) => ({
            wordID: word.wordID, 
            definitionID: word.definitionID
          }))
        });
        console.log('Task created successfully:', response.data);
        onClose(); 
      } catch (error) {
        console.error('Error creating task:', error);
      }
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={handleNameChange}
      />
      <WordInput addWordToTask={addWordToTask} />
      <h3>Selected Words:</h3>
      <ul style={{ 
  display: "flex", 
  flexWrap: "wrap", 
  gap: "10px", 
  listStyleType: "none", 
  padding: 0 
}}>
  {selectedWords.map((word) => (
    <li key={word.wordID} style={{ display: "flex", alignItems: "center" }}>
      <span>{word.wordName}</span>
      <button
        style={{
          background: "none",
          border: "none",
          color: "gray",
          fontSize: "12px",
          cursor: "pointer",
          marginLeft: "5px",
        }}
        onClick={() => removeWordFromTask(word.wordID)}
      >
        ✖
      </button>
    </li>
  ))}
</ul>

      <button onClick={createTask}>Create Task</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default NewTask;
