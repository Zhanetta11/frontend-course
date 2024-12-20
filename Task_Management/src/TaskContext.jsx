import React, { createContext, useContext } from 'react';
import { useTaskManager } from './hooks/UseTaskManager';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const taskManager = useTaskManager();

  return (
    <TaskContext.Provider value={taskManager}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}