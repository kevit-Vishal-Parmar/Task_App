const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
require("./db/mongoose")
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

//* Add New User

app.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//* Get All Users.

app.get("/users", async (req, res) => {
    try {
        await User.find({}).then((users) => { res.status(200).send(users) })
    } catch {
        (e) => {
            res.status(500).send(e)
        }
    }
})

//* Get One User.

app.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        await User.findById(_id).then((user) => {
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//* Add New Task

app.post("/tasks", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

//* Get All Tasks.

app.get("/tasks", async (req, res) => {
    try {
        await Task.find({}).then((tasks) => {
            res.status(200).send(tasks)
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Get One Task

app.get("/task/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        await Task.findById(_id).then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//! Listen App In Port

app.listen(PORT, () => {
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})