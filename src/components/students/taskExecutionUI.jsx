import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import "../../css/TaskMatching.css";

const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#ffb4a2", "#e5989b"];

const TaskExecution = ({ executionID }) => {
  const [words, setWords] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [pairs, setPairs] = useState([]);
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);

  const [selectedWord, setSelectedWord] = useState(null);

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

  const handleWordSelection = (word) => {
    setSelectedWord(word);
  };

  const handleDefinitionSelection = (definition) => {
    if (selectedWord) {
      setPairs((prevPairs) => {
        const newPair = { word: selectedWord, definition, color: colors[prevPairs.length % colors.length] };
        return [...prevPairs, newPair];
      });
      setSelectedWord(null);
    }
  };


  // Submit task answers
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.put(`http://localhost:3000/performance/${executionID}`, pairs);
      setResults(response.data.results);
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="task-container">
      <h1>Task Execution</h1>
      <div className="task-section">
        <h2>Words</h2>
        {words.map(word => (
          <div key={word.id}>{word.content}</div>
        ))}
      </div>

      <div className="task-container">
      <div className="words-column">
        <h2>Words</h2>
        {words.map((word) => (
          <div
            key={word.id}
            className={`task-item ${selectedWord === word ? "selected" : ""}`}
            onClick={() => handleWordSelection(word)}
            style={{ backgroundColor: pairs.find(pair => pair.word.id === word.id)?.color || "white" }}
          >
            {word.content}
          </div>
        ))}
      </div>

      <div className="definitions-column">
        <h2>Definitions</h2>
        {definitions.map((definition) => (
          <div
            key={definition.id}
            className="task-item"
            onClick={() => handleDefinitionSelection(definition)}
            style={{ backgroundColor: pairs.find(pair => pair.definition.id === definition.id)?.color || "white" }}
          >
            {definition.content}
          </div>
        ))}
      </div>
    </div>

      <button onClick={handleSubmit}>Submit Task</button>

      {results && (
        <div className="results">
          <h2>Results</h2>
          <p>Score: {score}%</p>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                Word ID: {result.wordID}, Definition ID: {result.definitionID}, Valid: {result.isValid ? 'Yes' : 'No'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskExecution;
