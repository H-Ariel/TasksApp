import React from 'react';


class EditTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: props.task.text, editing: false };
    }

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
        fetch(`/api/tasks/${this.props.task.id}`, {
            method: 'DELETE'
        })
            .then((response) => this.props.updateList())
            .catch((error) => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                {this.state.editing ? <input type="text" value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })} />
                    : null}

                {this.state.editing ? <button onClick={this.handleUpdateTask}>Update</button>
                    : <div>
                        <button onClick={() => this.setState({ editing: true }/* enable editing mode */)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button onClick={this.handleDeleteTask}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

export default EditTask;
