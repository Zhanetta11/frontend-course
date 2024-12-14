import React from 'react';
import TaskItem from './TaskItem';
import { useTaskContext } from '../TaskContext';

function TaskList() {
  const { tasks } = useTaskContext();

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;