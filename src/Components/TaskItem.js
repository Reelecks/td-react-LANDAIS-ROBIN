import React from 'react';
import { runConfettiAnimation } from './confetti'; 
import './TaskItem.css';
const TaskItem = ({ task, toggleTask }) => {
    const handleCompletion = () => {
        toggleTask(task.id);
        if (!task.completed) {
            runConfettiAnimation();
        }
    };

    return (
        <li
            data-cy="task-item"
            className={task.completed ? 'completed' : ''}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={handleCompletion}
        >
            {task.text}
        </li>
    );
};

export default TaskItem;
