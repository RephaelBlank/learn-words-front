import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import "../../css/TaskMatching.css";
import { ImmediateTaskResults } from './viewResult';

const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#ffb4a2", "#e5989b"];

const TaskExecution = ({ executionID }) => {
  const [words, setWords] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);

  const [selectedWord, setSelectedWord] = useState(null);
  const [lastSelectedDefinition, setLastSelectedDefinition] = useState(null);
  const [pairColors, setPairColors] = useState({});

  const [taskResults, setTaskResult] = useState (null); 


  // Fetch task data
  useEffect(() => {
    const fetchTask = async () => {
        if (!executionID) return;
      try {
        const response = await axiosInstance.get(`http://localhost:3000/performance/${executionID}`);
        setWords(response.data.words);
        setDefinitions(response.data.definitions);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [executionID]);

  useEffect(() => {
    if (words.length > 0) {
      const initialAnswers = words.map(word => ({ wordID: word.id, definitionID: null }));
      setAnswers(initialAnswers);
    }
  }, [words]);

  const findAnswer = (wordID) => answers.find(ans => ans.wordID === wordID);

  const handleWordSelection = (word) => {
    const answer = findAnswer(word.id);
    if (answer && answer.definitionID !== null) {
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.wordID === word.id ? { ...ans, definitionID: null } : ans
        )
      );
      setPairColors(prev => {
        const newMapping = { ...prev };
        delete newMapping[word.id];
        return newMapping;
      });
      setLastSelectedDefinition(null);
      setSelectedWord(null); 
    } else {
        if (selectedWord && selectedWord.id === word.id) {
          setSelectedWord(null);
      } else {
        setSelectedWord(word);
      }
    }
  };

  const handleDefinitionSelection = (definition) => {

    if (!selectedWord) return;

    const definitionAssigned = answers.find(ans => ans.definitionID === definition.id);

    if (!definitionAssigned)  {
      setAnswers(prevAnswers =>
        prevAnswers.map(ans =>
          ans.wordID === selectedWord.id ? { ...ans, definitionID: definition.id } : ans
        )
      );
      setLastSelectedDefinition(definition.id);
      setPairColors(prev => {
        if (prev[selectedWord.id]) return prev; 
        const usedColors = Object.values(prev);
        const availableColors = colors.filter(c => !usedColors.includes(c));
        const newColor = availableColors.length > 0 ? availableColors[0] : colors[Object.keys(prev).length % colors.length];
        return { ...prev, [selectedWord.id]: newColor };
      });
      setSelectedWord(null);
    }
  };

  const isWordAssigned = (wordID) => {
    const ans = findAnswer(wordID);
    return ans && ans.definitionID !== null;
  };

  const isDefinitionAssigned = (definitionID) => {
    return answers.some(ans => ans.definitionID === definitionID);
  };

  const isDefinitionLastSelected = (definitionID) => {
    return lastSelectedDefinition === definitionID;
  };

  const getColorForWord = (wordID) => {
    return pairColors[wordID] || "white";
  };

  const getColorForDefinition = (definitionID) => {
    const assignedAnswer = answers.find(ans => ans.definitionID === definitionID);
    if (assignedAnswer) {
      return pairColors[assignedAnswer.wordID] || "white";
    }
    return "white";
  };

  // Submit task answers
  const handleSubmit = async () => {
    try {
      const {data} = await axiosInstance.put(`http://localhost:3000/performance/${executionID}`, answers);
      setTaskResult (data); 
      setResults(data.results);
      setScore(data.score);
      
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <>
    {taskResults? (
      <ImmediateTaskResults execution={taskResults}/>
    ) : definitions.length>0? (
    <div className="task-container">
      <h1>Task Execution</h1>

      <div className="task-container">
        <div className="words-column">
          <h2>Words</h2>
          {words.map(word => (
            <div
              key={word.id}
              className={`task-item ${selectedWord && selectedWord.id === word.id ? "selected" : ""}`}
              onClick={() => handleWordSelection(word)}
              style={{
                backgroundColor: isWordAssigned(word.id) ? getColorForWord(word.id) : "white",  
                border: (selectedWord && selectedWord.id === word.id)
                  ? "2px dashed blue"
                  : (isWordAssigned(word.id) ? "2px solid green" : "1px solid gray"),
                cursor: "pointer",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              {word.content}
            </div>
          ))}
        </div>

        <div className="definitions-column">
          <h2>Definitions</h2>
          {definitions.map(definition => (
            <div
              key={definition.id}
              className={`task-item ${isDefinitionLastSelected(definition.id) ? "last-selected" : ""}`}
              onClick={() => handleDefinitionSelection(definition)}
              style={{
                backgroundColor: isDefinitionAssigned(definition.id)
                  ? getColorForDefinition(definition.id)
                  : "white",
                border: isDefinitionLastSelected(definition.id) ? "2px solid blue" : "1px solid gray",
                cursor: "pointer",
                marginBottom: "5px",
                padding: "5px"
              }}
            >
              {definition.content}
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit}>Submit Task</button>
      </div>
       ) : (<> Loading Task...</>) }
    </>
  );
};


export default TaskExecution;
