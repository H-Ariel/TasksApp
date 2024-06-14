import React from 'react';


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.task.text };
    }

    handleUpdateTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.state.text }),
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    handleDeleteTask = () => {
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'DELETE'
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })} />
                <button onClick={this.handleUpdateTask}>Update</button>
                <button onClick={this.handleDeleteTask}>Delete</button>
            </div>
        );
    }
}


export default EditTask;
