import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import '../../css/List.css';

function DefinitionInput ({word, addDefinition}){ 
    const [suggestions, setSuggestions] = useState([]);
    const [definitionID, setDefinitionID] = useState (null); 
    const [aiDefinition, setAiDefinition] = useState (null);

    useEffect ( ()=> {
        fetchSuggestions(); 
    },word)

    const fetchSuggestions = async () => {
        try {
          const {data} = await axiosInstance.get(`/tasks/definitions?wordID=${word.wordID}`); 
          setSuggestions(data);
        } catch (error) {
          console.error(error);
        }
    };

    const fetchAiDefinition = async () => {
        try {
          const {data} = await axiosInstance.get(`/tasks/definition/ai?wordID=${word.wordID}`); 
          setAiDefinition(data);
        } catch (error) {
          console.error(error);
        }
    }

    // פונקציה לעדכון הערך של תיבת הטקסט
    const handleAiDefinitionChange = (e) => {
        setAiDefinition(e.target.value);
    }

    const createDefinition = async (definition) => {
        try {
          console.log (definition); 
          console.log(typeof(definition)); 
            const {data} = await axiosInstance.post(`/tasks/definitions`,{wordID: word.wordID, definitionText: definition});
            setDefinitionID (data); 
            console.log (data); 
            return data;
        } catch (error){
            console.error(error); 
        }
    };

    const selectDefinition = async (definition) => {
      let id;
        if (definition.definitionID){
            id = definition.definitionID;
            setDefinitionID (definition.definitionID); 
        }
        else {
            id = await createDefinition (definition.definition); 
            setDefinitionID (id); 
        }
        console.log (id); 
       addDefinition (id); 
    }

    return (
      <div>
        {word.wordName} : Chose Definition 
         <ul>
        {suggestions.map((definition) => (
          <li key={definition} onClick={() => selectDefinition(definition)}>
            {definition.definition || definition}
          </li>
        ))}
      </ul>
      <button
        onClick={fetchAiDefinition}
        style={{
          background: "#4b6cb7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "8px 18px",
          marginTop: "1em",
          marginBottom: "0.5em",
          fontWeight: "bold",
          fontSize: "1em",
          cursor: "pointer",
          boxShadow: "0 2px 6px #0002"
        }}
      >
        <span role="img" aria-label="ai" style={{marginRight: "6px"}}>✨</span>
        Fetch AI definition
      </button>
      <br />
      <textarea
        value={aiDefinition || ""}
        onChange={handleAiDefinitionChange}
        placeholder="ai definition"
        style={{
          width: "100%",
          minHeight: "60px",
          marginTop: "0.5em",
          border: "2px solid #4b6cb7",
          borderRadius: "6px",
          padding: "8px",
          fontSize: "1em"
        }}
      />
      <button
        onClick={() => selectDefinition({definition: aiDefinition})}
        style={{
          background: "#ff9800",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "8px 18px",
          marginTop: "0.5em",
          fontWeight: "bold",
          fontSize: "1em",
          cursor: "pointer",
          boxShadow: "0 2px 6px #0002"
        }}
      >
        Add AI Definition
      </button>
    </div>)
}

export default DefinitionInput;