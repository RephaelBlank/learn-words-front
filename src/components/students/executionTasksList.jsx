import { useState } from "react";
import { ImmediateTaskResults } from "./viewResult";

function ExecutionTasksList({ tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedAssignedID, setSelectedAssignedID] = useState(null);
  const [expandedExecution, setExpandedExecution] = useState(null);

  // פונקציה לבחירת מטלה
  const handleTaskSelection = (e) => {
    setSelectedTask(e.target.value);
    setSelectedAssignedID(null); // איפוס המועד
    setExpandedExecution(null);  // איפוס פירוט התוצאות
  };

  // פונקציה לבחירת מועד
  const handleAssignedSelection = (e) => {
    setSelectedAssignedID(e.target.value);
    setExpandedExecution(null); // איפוס פירוט התוצאות
  };

  // מיפוי מטלות לפי taskID
  const tasksByID = tasks.reduce((acc, task) => {
    if (!acc[task.taskID]) {
      acc[task.taskID] = {
        taskName: task.taskName,
        executions: [],
      };
    }
    acc[task.taskID].executions.push(task);
    return acc;
  }, {});

  // מיפוי לפי assignedID של המטלה שנבחרה
  const assignedByID = selectedTask
    ? tasksByID[selectedTask].executions.reduce((acc, task, index) => {
        const assignedNumber = index + 1; // לכל מטלה יש מועד 1, 2, 3...
        if (!acc[assignedNumber]) {
          acc[assignedNumber] = [];
        }
        acc[assignedNumber].push(task);
        return acc;
      }, {})
    : {};

  return (
    <div>
      {/* בחירת מטלה */}
      <select onChange={handleTaskSelection} value={selectedTask || ""}>
        <option value="" disabled>בחר מטלה</option>
        {Object.keys(tasksByID).map((taskID) => (
          <option key={taskID} value={taskID}>
            {tasksByID[taskID].taskName}
          </option>
        ))}
      </select>

      {/* בחירת מועד */}
      {selectedTask && (
        <select onChange={handleAssignedSelection} value={selectedAssignedID || ""}>
          <option value="" disabled>בחר מועד</option>
          {Object.keys(assignedByID)
            .sort((a, b) => a - b) // סידור לפי assignedID מהקטן לגדול
            .map((assignedID) => (
              <option key={assignedID} value={assignedID}>
                מועד {assignedID}
              </option>
            ))}
        </select>
      )}

      {/* הצגת הביצועים */}
      {selectedAssignedID && (
        <ul>
          {assignedByID[selectedAssignedID].map((task) => (
            <li key={task.executionID}>
              <button onClick={() => setExpandedExecution(expandedExecution === task.executionID ? null : task.executionID)}>
                {task.sendTime.split("T")[0]} - {task.submissionTime.split("T")[0]}
              </button>
              {expandedExecution === task.executionID && <ImmediateTaskResults execution={task} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExecutionTasksList;
