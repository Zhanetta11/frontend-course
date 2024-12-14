import React from 'react';

function TaskItem({ task, deleteTask }) {
  return (
    <li>
      {task}
      <button onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
}

export default TaskItem;