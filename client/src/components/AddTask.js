import React from 'react';


class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    handleAddTask = () => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.state.text })
        })
            .then((response) => {
                this.props.updateList();
                this.setState({ text: '' });
            })
            .catch((error) => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="Add a new task" value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })} />
                <button onClick={this.handleAddTask}>Add</button>
            </div>
        );
    }
}


export default AddTask;
