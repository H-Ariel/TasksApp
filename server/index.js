const express = require('express');
const MyDB = require('./MyDB');

const port = 3001;
const app = express();
const db = new MyDB.MySqliteDB();

// Middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
    //res.redirect("http://localhost:3000");
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Define CRUD operations
// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await db.addTask(new MyDB.TaskObject(req.body.text));
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create Task' });
    }
});

// Read all Tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await db.getTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve Tasks' });
    }
});

// Update a Task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await db.getTask(id);
        if (req.body.hasOwnProperty('text'))
            task.text = req.body.text;
        if (req.body.hasOwnProperty('completed'))
            task.completed = req.body.completed;
        await db.updateTask(id, task);
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update Task' });
    }
});

// Delete a Task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.deleteTask(id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete Task' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
