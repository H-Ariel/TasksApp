import React from 'react';


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.task.text };
    }

    handleInputChange = (e) => {
        this.setState({ text: e.target.value });
    };

    handleUpdateTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.state.text }),
        })
            .then((response) =>  this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    handleDeleteTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'DELETE'
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    handleCompleteTask = () => {
        console.log('handleCompleteTask', this.props.task);
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    handleRestoreTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: false }),
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.handleInputChange} />
                <button onClick={this.handleUpdateTask}>Update</button>
                <button onClick={this.handleDeleteTask}>Delete</button>
                <button onClick={this.props.task.completed ? this.handleRestoreTask : this.handleCompleteTask}>
                    {this.props.task.completed ? 'Restore' : 'Complete'}
                </button>
            </div>
        );
    }
}


export default EditTask;
