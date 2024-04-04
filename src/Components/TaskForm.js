import React, { useState } from 'react';
import './TaskForm.css';


const TaskForm = ({ onAddTask }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(input);
        setInput(''); 
    };

    return (
        <form data-cy="task-form" onSubmit={handleSubmit}>
            <input
                data-cy="task-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ajouter une nouvelle tâche..."
            />
            <button data-cy="add-task-btn" type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
