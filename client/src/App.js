import React from 'react';
import TasksList from './TasksList';
import AddTask from './AddTask';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.addTaskToList = this.addTaskToList.bind(this);
        this.updateTaskInList = this.updateTaskInList.bind(this);
        this.deleteTaskInListById = this.deleteTaskInListById.bind(this);
    }

    componentDidMount() { 
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((tasks) => this.setState({ tasks }));
    }

    addTaskToList(task) {
        // add task to list
        const { tasks } = this.state;
        tasks.push(task);
        this.setState({ tasks });
    }

    updateTaskInList(task) {
        // update task in list
        const { tasks } = this.state;
        const idx = tasks.findIndex((t) => t.id === task.id);
        tasks[idx] = task;
        this.setState({ tasks });
    }

    deleteTaskInListById(taskId) {
        // delete task in list
        const { tasks } = this.state;
        const idx = tasks.findIndex((t) => t.id === taskId);
        tasks.splice(idx, 1);
        this.setState({ tasks });
    }

    render() {
        const { tasks } = this.state;
        let completedTasks = tasks.filter((task) => task.completed);
        let incompletedTasks = tasks.filter((task) => !task.completed);

        return (
            <div>
                <h1>My Awesome Tasks App!</h1>

                <AddTask addTaskToList={this.addTaskToList} />

                {incompletedTasks.length > 0 && (
                    <div>
                        <h2>My Tasks:</h2>
                        <TasksList tasks={incompletedTasks}
                            updateTaskInList={this.updateTaskInList}
                            deleteTaskInListById={this.deleteTaskInListById} />
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2>Completed Tasks:</h2>
                        <TasksList tasks={completedTasks}
                            updateTaskInList={this.updateTaskInList}
                            deleteTaskInListById={this.deleteTaskInListById} />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
