import React from 'react';
import TaskItem from './TaskItem';
import { useTaskContext } from '../TaskContext';

function TaskList() {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;