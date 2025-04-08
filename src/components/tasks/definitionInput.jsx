import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import '../../css/List.css';

function DefinitionInput ({word, addDefinition}){ 
    const [suggestions, setSuggestions] = useState([]);
    const [definitionID, setDefinitionID] = useState (null); 

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

    return (<div>
        {word.wordName} : Chose Definition 
         <ul>
        {suggestions.map((definition) => (
          <li key={definition} onClick={() => selectDefinition(definition)}>
            {definition.definition || definition}
          </li>
        ))}
      </ul>
    </div>)
}

export default DefinitionInput; 