const express = require('express');
const { TasksSqliteDB, TaskObject } = require('./TasksDB.js');

const port = 3001;
const app = express();
const db = new TasksSqliteDB();


// Middleware
app.use(express.json());


// Define routes
app.get('/', (req, res) => {
    res.send('This is the root route. Please use /api/tasks to access the tasks');
});


// Define CRUD operations
// Create a new task
app.post('/api/tasks', async (req, res) =>
    db.addTask(new TaskObject(req.body.text))
        .then((task) => res.status(201).json(task))
        .catch((err) => res.status(400).json({ error: 'Failed to create Task' }))
);

// Read all Tasks
app.get('/api/tasks', async (req, res) =>
    db.getTasks()
        .then((tasks) => res.json(tasks))
        .catch((err) => res.status(500).json({ error: 'Failed to retrieve Tasks' }))
);

// Update a Task
app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    db.getTask(id)
        .then((task) => {
            if (req.body.hasOwnProperty('text'))
                task.text = req.body.text;
            if (req.body.hasOwnProperty('completed'))
                task.completed = req.body.completed;

            return db.updateTask(id, task);
        }).then((task) => res.json(task))
        .catch((err) => res.status(400).json({ error: 'Failed to update Task' }))
});

// Delete a Task
app.delete('/api/tasks/:id', async (req, res) =>
    db.deleteTask(req.params.id)
        .then(() => res.status(204).send())
        .catch((err) => res.status(400).json({ error: 'Failed to delete Task' }))
);


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
