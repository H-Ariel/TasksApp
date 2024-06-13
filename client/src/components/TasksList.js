import React from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';


function TasksList({ tasks, updateList }) {

    // TODO: do not use "updateList" after change, use "setTasks" instead

    let handleDeleteTask = (task) => {
        fetch(`/api/tasks/${task.id}`, {
            method: 'DELETE'
        })
            .catch((error) => console.error('Error:', error));
        updateList();
    };

    let handleRestoreTask = (task) => {
        fetch(`/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deleted: false }),
        })
            //.then((response) => response.json()).then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        updateList();
    };

    return (
        <div>
            <h2>Tasks List</h2>
            <AddTask updateList={updateList} />
            <h3>My Tasks:</h3>
            <ul>
                {tasks ? tasks.filter((task) => !task.deleted).map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <EditTask task={task} updateList={updateList} />
                        <button onClick={() => handleDeleteTask(task)}>Delete</button>
                    </li>
                )) : null}
            </ul>

            <h3>Deleted Tasks:</h3>
            <ul>
                {tasks ? tasks.filter((task) => task.deleted).map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => handleRestoreTask(task)}>Restore</button>
                    </li>
                )) : null}
            </ul>
        </div>
    );
}

export default TasksList;
