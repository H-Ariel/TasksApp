import React from 'react';


class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: '', adding: false };
    }

    handleAddTask = () => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: this.state.text })
        })
            .then((response) => {
                this.props.updateList();
                this.setState({ text: '', adding: false });
            })
            .catch((error) => console.error('Error:', error));
    };

    render() {
        return (<div>
            <button onClick={this.handleAddTask}>
                <i className="fa fa-plus fa-sm"></i>
            </button>
            <input type="text" placeholder="Add a new task" value={this.state.text}
                onChange={(e) => this.setState({ text: e.target.value })}
                onKeyPress={(e) => { if (e.key === 'Enter') this.handleAddTask(); }}
            />
        </div>);

    }
}


export default AddTask;
