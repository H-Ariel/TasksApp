import React from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';


function TasksList({ tasks, updateList }) {

    // TODO: do not use "updateList" after change, use "setTasks" instead

    return (
        <div>
            <h2>Tasks List</h2>
            <AddTask updateList={updateList} />
            <h3>My Tasks:</h3>
            <ul>
                {tasks ? tasks.filter((task) => !task.completed).map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <EditTask task={task} updateList={updateList} />
                    </li>
                )) : null}
            </ul>

            <h3>Completed Tasks:</h3>
            <ul>
                {tasks ? tasks.filter((task) => task.completed).map((task) => (
                    <li key={task.id}>
                        {task.text}
                        <EditTask task={task} updateList={updateList} />
                    </li>
                )) : null}
            </ul>
        </div>
    );
}

export default TasksList;
