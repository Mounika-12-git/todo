
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((item) => !item.completed));
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-card">
        <header className="header">
          <span className="eyebrow">YOUR DAILY PLANNER</span>
          <h1>My To-Do List <span>✦</span></h1>
          <p>Small steps every day make a big difference.</p>
        </header>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="add-btn">
            + Add
          </button>
        </form>

        <div className="summary">
          <span>{tasks.length} total tasks</span>
          <span>{completedCount} completed</span>
        </div>

        <div className="filters">
          {['all', 'active', 'completed'].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? 'filter active' : 'filter'}
              onClick={() => setFilter(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty">
              <span>🌷</span>
              <p>
                {tasks.length === 0
                  ? 'Your list is waiting for its first task!'
                  : 'No tasks in this category.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((item) => (
              <div className="task-item" key={item.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  <span
                    className={
                      item.completed ? 'task-text completed' : 'task-text'
                    }
                  >
                    {item.text}
                  </span>
                </label>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTask(item.id)}
                  aria-label={`Delete ${item.text}`}
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            className="clear-btn"
            onClick={clearCompleted}
          >
            Clear completed tasks
          </button>
        )}

        <footer>Made with ♡ · One thing at a time</footer>
      </div>
    </div>
  );
}

export default App;
