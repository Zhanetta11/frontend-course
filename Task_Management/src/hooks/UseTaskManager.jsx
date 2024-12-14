import { useState } from 'react';

export function useTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter((task) => task !== taskToDelete));
  };

  const getTasks = () => {
    return tasks;
  };

  return {
    tasks,
    newTask,
    setNewTask,
    addTask,
    deleteTask,
    getTasks
  };
}