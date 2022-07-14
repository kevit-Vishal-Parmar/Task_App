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
        const users = await User.find({})
        res.status(200).send(users)
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
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

//* Update User.

app.patch("/user/:id", async (req, res) => {
    const allowedUpdate = ["name", "age", "email", "password"];
    const updates = Object.keys(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidation) {
        return res.status(400).send({ error: "Invalid Update!" })
    }
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a User

app.delete("/user/:id",async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            res.status(404).status({error : "User Is Not Exits"})
        }
        res.send(user)
    } catch (e) {
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
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Get One Task

app.get("/task/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Update Task

app.patch("/task/:id", async (req, res) => {
    const allowedUpdate = ["description", "complete"];
    const updates = Object.keys(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidation) {
        return res.status(400).send({ error: "Invalid Update!" })
    }
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a Task

app.delete("/task/:id",async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            res.status(404).status({error : "Task Is Not Exits"})
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
//! Listen App In Port

app.listen(PORT, () => {
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})