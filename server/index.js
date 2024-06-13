const express = require('express');
const dotenv = require('dotenv');
const MyDB = require('./MyDB');


dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3001;
const db = new MyDB.MyDB();

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
        const task = new MyDB.TaskObject(req.body.text);
        db.addTask(task);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create ToDo' });
    }
});

// Read all ToDos
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = db.getTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve ToDos' });
    }
});

// Update a ToDo
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = db.getTask(id);

        if (req.body.hasOwnProperty('deleted'))
            task.deleted = req.body.deleted == 'true';
        if (req.body.hasOwnProperty('text'))
            task.text = req.body.text;
        if (req.body.hasOwnProperty('completed'))
            task.completed = req.body.completed == 'true';

        db.updateTask(id, task);
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update ToDo' });
    }
});

// Delete a ToDo
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        db.deleteTask(id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete ToDo' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
