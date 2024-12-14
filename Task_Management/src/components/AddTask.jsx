import React from 'react';

function AddTask({ newTask, setNewTask, addTask }) {
  return (
    <div>
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