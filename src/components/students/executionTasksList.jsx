import { ImmediateTaskResults } from "./viewResult";

function ExecutionTasksList({ tasks}) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task}>
            <ImmediateTaskResults execution={task}/> 
          </li>
        ))}
      </ul>
    );
  }
  
  export default ExecutionTasksList;