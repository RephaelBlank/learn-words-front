import { useState } from 'react';
import axios from 'axios';

function WordInput({ addWordToTask }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSuggestions = async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}/tasks/words?prefix=${query}`);
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectWord = (word) => {
    addWordToTask(word); 
    setInput('');
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter word"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value) fetchSuggestions(e.target.value);
          else setSuggestions([]);
        }}
      />
      <ul>
        {suggestions.map((word) => (
          <li key={word.wordID} onClick={() => selectWord(word)}>
            {word.wordName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WordInput;