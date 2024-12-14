import React from 'react';
import { useTaskContext } from '../TaskContext';

function AddTask() {
  const { newTask, setNewTask, addTask } = useTaskContext();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default AddTask;