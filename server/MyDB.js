class TaskObject {
    constructor(text) {
        this.text = text;
        this.completed = false;
        this.deleted = false;
    }
}

// a custom DB as json object
// this will be replaced with a real database in the next steps
class MyDB {
    constructor() {
        this.tasks = [];

        this.addTask(new TaskObject('Learn React'));
        this.addTask(new TaskObject('Learn Node.js'));
        this.addTask(new TaskObject('Learn Express'));
    }

    addTask(task) {
        if (task.text === undefined || task.text === '')
            return null;

        task.id = this.tasks.length;
        this.tasks.push(task);
        return task;
    };
    getTasks() { return this.tasks; };
    getTask(id) { return this.tasks[id]; };
    updateTask(id, task) { this.tasks[id] = task; };
    deleteTask(id) { this.tasks[id].deleted = true; };
}


module.exports = { MyDB, TaskObject };
