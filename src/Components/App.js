import React, { useState, useEffect } from 'react';
import TaskList from './TaskList'; 
import './App.css';
import { runConfettiAnimation } from './confetti'; 
import TaskForm from './TaskForm';

const App = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (text) => {
      if (!text.trim()) return;
      const newTask = { id: Date.now(), text, completed: false };
      setTasks([...tasks, newTask]);
  };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'active':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <TaskForm onAddTask={handleAddTask} />
            <div>
                <button data-cy="filter-btn-all" onClick={() => setFilter('all')}>Toutes</button>
                <button data-cy="filter-btn-undone" onClick={() => setFilter('active')}>Non complétées</button>
                <button data-cy="filter-btn-done" onClick={() => setFilter('completed')}>Complétées</button>
            </div>
            <TaskList data-cy="task-list" tasks={getFilteredTasks()} toggleTask={toggleTask} />
        </div>
    );
};

export default App;
