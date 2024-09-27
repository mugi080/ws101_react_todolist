import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  const addTask = () => {
    if (taskName) {
      setTasks([...tasks, { id: Date.now(), name: taskName, completed: false }]);
      setTaskName('');
    }
  };

  const startEditingTask = (id, name) => {
    setEditingTaskId(id);
    setEditingTaskName(name);
  };

  const confirmEditTask = (id) => {
    updateTask(id, editingTaskName);
    setEditingTaskId(null);
  };

  const updateTask = (id, newTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, name: newTask } : task));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filterTasks = () => {
    if (filter === "completed") {
      return tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const sortTasks = () => {
    return [...filterTasks()].sort((a, b) => a.name.localeCompare(b.name));
  };

  return (
    <div className="app">
      <div className="task-creation">
        <h1>Create Task</h1>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
          placeholder="Add a new task" 
        />
        <button onClick={addTask}>Add Task</button>

        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <div className="task-list">
        <h1>Tasks</h1>
        <ul>
          {sortTasks().map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {editingTaskId === task.id ? (
                <>
                  <input 
                    type="text" 
                    value={editingTaskName} 
                    onChange={(e) => setEditingTaskName(e.target.value)} 
                  />
                  <button onClick={() => confirmEditTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <span>{task.name}</span>
                  <button onClick={() => startEditingTask(task.id, task.name)}>Edit</button>
                </>
              )}
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
