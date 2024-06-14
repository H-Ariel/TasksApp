import React, { useState } from 'react';
import TasksList from './components/TasksList';
import AddTask from './components/AddTask';


function App() {
    const [tasks, setTasks] = useState([]);

    let updateList = function () {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((tasks) => setTasks(tasks));
    };


    updateList();

    return (
        <div>
            <h1>My Awesome Tasks App!</h1>

            <h2>Tasks List</h2>
            <AddTask updateList={updateList} />

            <h3>My Tasks:</h3>
            <TasksList tasks={tasks.filter((task) => !task.completed)} updateList={updateList} />

            <h3>Completed Tasks:</h3>
            <TasksList tasks={tasks.filter((task) => task.completed)} updateList={updateList} />

        </div>
    );
}

export default App;
