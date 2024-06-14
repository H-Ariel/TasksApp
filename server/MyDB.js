const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


class TaskObject {
    constructor(text) {
        this.text = text;
        this.completed = false;
    }
}

// add class SqliteDB
class MySqliteDB {
    constructor() {
        let exists = fs.existsSync('tasksdb.sqlite'); // if the file exists, do not initialize the database
        this.db = new sqlite3.Database('tasksdb.sqlite');
        if (!exists) this.initializeDatabase();
    }

    initializeDatabase() {
        this.db.serialize(() => {
            this.db.run(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    text TEXT NOT NULL,
                    completed BOOLEAN NOT NULL DEFAULT 0
                )
            `);

            this.addTask(new TaskObject('Learn React'));
            this.addTask(new TaskObject('Learn Node.js'));
            this.addTask(new TaskObject('Learn Express'));
        });
    }

    addTask(task) {
        return new Promise((resolve, reject) => {
            if (task.text === undefined || task.text === '') {
                return resolve(null);
            }

            const stmt = this.db.prepare('INSERT INTO tasks (text, completed) VALUES (?, ?)');
            stmt.run(task.text, task.completed, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ ...task, id: this.lastID });
                }
            });
            stmt.finalize();
        });
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM tasks', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getTask(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    updateTask(id, task) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('UPDATE tasks SET text = ?, completed = ? WHERE id = ?');
            stmt.run(task.text, task.completed, id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(task);
                }
            });
            stmt.finalize();
        });
    }

    deleteTask(id) {
        /*
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('UPDATE tasks SET deleted = 1 WHERE id = ?');
            stmt.run(id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            stmt.finalize();
        });
        */

        // delete totaly (not just mark as deleted)
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare('DELETE FROM tasks WHERE id = ?');
            stmt.run(id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
            stmt.finalize();
        });
    }
}



module.exports = { TaskObject, MySqliteDB };
