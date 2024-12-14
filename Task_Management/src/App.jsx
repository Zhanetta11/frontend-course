import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  return (
    <div className="App">
      <h1>Task Management</h1>
      <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;