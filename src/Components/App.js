import React, { useState, useEffect } from 'react';
import TaskList from './TaskList'; 
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
        setInput('');
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
            <form data-cy="task-form" onSubmit={addTask}>
                <input
                    data-cy="task-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button data-cy="add-task-btn" type="submit">Add Task</button>
            </form>
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
