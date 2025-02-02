function ExecutionTasksList({ tasks}) {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.executionID}>
            {task.score} 
          </li>
        ))}
      </ul>
    );
  }
  
  export default ExecutionTasksList;