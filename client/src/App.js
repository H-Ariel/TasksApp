import React, { useState } from 'react';
import TasksList from './components/TasksList';


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
            <TasksList tasks={tasks} updateList={updateList} />
        </div>
    );
}

export default App;
