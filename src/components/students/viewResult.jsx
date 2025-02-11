import { useEffect, useState } from "react"
import axiosInstance from "../../axiosInstance"

export const ImmediateTaskResults = ({execution}) => {
    return <TaskResultsView execution={execution}/>
}

export const PrevTaskResults = ({executionID}) => {
    const [execution, setExecution] = useState (null); 

    useEffect (()=> {
        const fetchTask = async() => {
            try {
                const {data} = await axiosInstance.get(`performance/${executionID}`);
                setExecution (data); 
            } catch (error){
                console.error(error); 
            }
        }
        fetchTask (); 
    },[executionID]);

    if (!results) return <p>Loading...</p>;
   
    return <TaskResultsView execution={execution}/>
    
}

const TaskResultsView = ({execution}) => {
    const results = execution.results; 
    const score = execution.score; 

    if (execution.status !== 'COMPLETED'){
      return ( <>
      Task pending to execuate</>)
      }
      else {
       

    return (
        <div className="results">
        <h2>Results</h2>
        <p>Score: {score}%</p>
        <ul>
          {results && results.map((result, index) => (
            <li key={index}>
              Word ID: {result.wordID}, Definition ID: {result.definitionID}, Valid: {result.isValid ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default TaskResultsView;