import React from 'react';
import handleApiRequest from './handleApiRequest';


class TaskInList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editing: false, text: props.task.text };
    }

    setCompleted = (completed) => {
        handleApiRequest(this.props.task.id, 'PUT',
            (data) => this.props.updateTaskInList(data), { completed });
    }

    updateText = () => {
        handleApiRequest(this.props.task.id, 'PUT',
            (data) => {
                this.props.updateTaskInList(data);
                this.setState({ editing: false }); // disable editing mode
            }, { text: this.state.text });
    }

    deleteTask = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            handleApiRequest(this.props.task.id, 'DELETE',
                () => this.props.deleteTaskInListById(this.props.task.id));
        }
    }

    render() {
        const { task } = this.props;
        const { editing, text } = this.state;

        return (
            <li className='task-item'>
                {/* checkbox for task completion */}
                <button onClick={() => this.setCompleted(!task.completed)} className='task-checkbox'>
                    {task.completed ? <i className="far fa-check-square fa-sm"></i>
                        : <i className="far fa-square fa-sm"></i>}
                </button>

                {/* task text */}
                {editing ? <input
                    type="text"
                    value={text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                    onBlur={this.updateText}
                    onKeyDown={(e) => { if (e.key === 'Enter') this.updateText(); }}
                    autoFocus />
                    :
                    <span className={`task-text ${task.completed ? 'completed' : ''}`}
                        onClick={() => this.setState({ editing: true })}>
                        {task.text}
                    </span>
                }

                {/* edit and delete buttons */}
                <button onClick={this.deleteTask}>
                    <i className="fa fa-trash-alt fa-sm"></i>
                </button>
            </li>
        );
    }
}

function TasksList({ tasks, updateTaskInList, deleteTaskInListById }) {
    return (
        <div>
            <ul className='tasks-list'>
                {tasks.map((task) => <TaskInList key={task.id} task={task}
                    updateTaskInList={updateTaskInList}
                    deleteTaskInListById={deleteTaskInListById}
                />)}
            </ul>
        </div>
    );
}

export default TasksList;
