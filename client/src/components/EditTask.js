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
            //.then((response) => response.json()).then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        this.props.updateList();
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.text} onChange={this.handleInputChange} />
                <button onClick={this.handleUpdateTask}>Update</button>
            </div>
        );
    }
}


export default EditTask;
