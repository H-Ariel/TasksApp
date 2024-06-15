import React from 'react';
import TasksList from './components/TasksList';
import AddTask from './components/AddTask';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount() { this.updateList(); }

    // TODO: do not use 'updateList' every change, use 'setTasks' in some cases
    updateList() {
        fetch('/api/tasks')
            .then((response) => response.json())
            .then((tasks) => this.setState({ tasks }));
    }

    render() {
        const { tasks } = this.state;
        let completedTasks = tasks.filter((task) => task.completed);
        let incompletedTasks = tasks.filter((task) => !task.completed);

        return (
            <div>
                <h1>My Awesome Tasks App!</h1>

                <AddTask updateList={this.updateList} />

                {incompletedTasks.length > 0 && (
                    <div>
                        <h2>My Tasks:</h2>
                        <TasksList tasks={incompletedTasks} updateList={this.updateList} />
                    </div>
                )}

                {completedTasks.length > 0 && (
                    <div>
                        <h2>Completed Tasks:</h2>
                        <TasksList tasks={completedTasks} updateList={this.updateList} />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
