import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import DefinitionInput from './definitionInput';

function WordInput({ addWordToTask }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedWord, setSelectedWord] = useState (null); 

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSuggestions = async (query) => {
    try {
      const {data} = await axiosInstance.get(`/tasks/words?prefix=${query}`); 
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectWord = (word) => {
    setSelectedWord(word);
  };

  const addDefinition = (definitionID) => {
    selectedWord.definitionID = definitionID;
    addWordToTask(selectedWord); 
    setInput('');
    setSuggestions([]); 
    setSelectedWord (null); 
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter word"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setSelectedWord(null); 
          if (e.target.value) fetchSuggestions(e.target.value);
          else setSuggestions([]);
        }}
      />
      {selectedWord? (
      <DefinitionInput word={selectedWord} addDefinition = {addDefinition}/>) : <>
      <ul>
        {suggestions.map((word) => (
          <li key={word.wordID} onClick={() => selectWord(word)}>
            {word.wordName}
          </li>
        ))}
      </ul>
      </>}
      </div>
  );
}

export default WordInput;