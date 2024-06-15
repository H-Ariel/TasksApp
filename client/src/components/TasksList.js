import React from 'react';


// TODO: move to other file ?
class TaskInList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editing: false, text: props.task.text };
    }

    setCompleted = (completed) => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    handleUpdateTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.state.text }),
        })
            .then((response) => {
                this.setState({ editing: false }); // disable editing mode
                this.props.updateList();
            })
            .catch((error) => console.error('Error:', error));
    };

    handleDeleteTask = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            fetch(`/api/tasks/${this.props.task.id}`, {
                method: 'DELETE'
            })
                .then((response) => this.props.updateList())
                .catch((error) => console.error('Error:', error));
        }
    };

    render() {
        const { task } = this.props;
        const { editing, text } = this.state;

        return (
            <li className='task-item'>
                {/* checkbox for task completion */}
                <button onClick={() => this.setCompleted(!task.completed)} className='task-checkbox'>
                    {task.completed ?
                        <i className="far fa-check-square fa-sm"></i>
                        : <i className="far fa-square fa-sm"></i>}
                </button>

                {/* task text */}
                {editing ?
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => this.setState({ text: e.target.value })}
                        onBlur={this.handleUpdateTask}
                        onKeyPress={(e) => { if (e.key === 'Enter') this.handleUpdateTask(); }}
                        autoFocus />
                    : <span className='task-text' onClick={() => this.setState({ editing: true })}>{task.text}</span>
                }

                {/* edit and delete buttons */}
                <button onClick={this.handleDeleteTask}>
                    <i className="fa fa-trash-alt fa-sm"></i>
                </button>
            </li>
        );
    }
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
