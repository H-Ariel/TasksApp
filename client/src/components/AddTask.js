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
        return (
            <div>
                {this.state.adding ?
                    <input type="text" placeholder="Add a new task" value={this.state.text}
                        onChange={(e) => this.setState({ text: e.target.value })} />
                    : null}

                {this.state.adding ?
                    <button onClick={this.handleAddTask}>
                        Add
                    </button>
                    : <button onClick={() => this.setState({ adding: true })}>
                        <i className="fas fa-plus"></i>
                    </button>
                }
            </div>
        );
    }
}


export default AddTask;
