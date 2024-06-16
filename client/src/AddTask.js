import React, { useState } from 'react';
import handleApiRequest from './handleApiRequest';


function AddTask({ addTaskToList }) {
    const [text, setText] = useState('');

    const handleAddTask = () => {
        if (text)
            handleApiRequest(null, 'POST',
                (data) => {
                    addTaskToList(data);
                    setText('');
                }, { text });
    };

    return (
        <div>
            <button onClick={handleAddTask}>
                <i className="fa fa-plus fa-sm"></i>
            </button>
            <input
                type="text"
                placeholder="Add a new task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
            />
        </div>
    );
}

export default AddTask;
