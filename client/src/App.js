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

    let completedTasks = tasks.filter((task) => task.completed);
    let incompletedTasks = tasks.filter((task) => !task.completed);

    return (
        <div>
            <h1>My Awesome Tasks App!</h1>

            <AddTask updateList={updateList} />

            {incompletedTasks.length > 0 && (
                <div>
                    <h2>My Tasks:</h2>
                    <TasksList tasks={incompletedTasks} updateList={updateList} />
                </div>
            )}

            {completedTasks.length > 0 && (
                <div>
                    <h2>Completed Tasks:</h2>
                    <TasksList tasks={completedTasks} updateList={updateList} />
                </div>
            )}

        </div>
    );
}

export default App;
