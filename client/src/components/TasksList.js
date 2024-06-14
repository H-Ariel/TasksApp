import React from 'react';
import EditTask from './EditTask';


function TaskInList({ task, updateList }) {
    let setCompleted = (completed) => {
        fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        })
            .then((response) => updateList())
            .catch((error) => console.error('Error:', error));
    };

    return <li className='task-item'>
        {/* checkbox to toggle the task's "completed" status*/}
        <input className='task-checkbox' type='checkbox' checked={task.completed}
            onChange={(e) => setCompleted(e.target.checked)} />
        {/* task text */}
        <span className='task-text'>{task.text}</span>
        <EditTask task={task} updateList={updateList} />
    </li>
}

function TasksList({ tasks, updateList }) {
    // TODO: do not use 'updateList' after change, use 'setTasks' instead
    return (
        <div>
            <ul className='tasks-list'>
                {tasks.map((task) => <TaskInList key={task.id} task={task} updateList={updateList} />)}
            </ul>
        </div>
    );
}

export default TasksList;
