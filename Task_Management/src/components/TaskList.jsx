import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;