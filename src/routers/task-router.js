const express = require("express");
const { model, models } = require("mongoose");
const Task = require("../models/task");
const { update } = require("../models/user");
const router = new express.Router();

//* Add New Task

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Get One Task

router.get("/task/:id", async (req, res) => {
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

router.patch("/task/:id", async (req, res) => {
    const allowedUpdate = ["description", "complete"];
    const updates = Object.keys(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    // if (!isValidation) {
    //     return res.status(400).send({ error: "Invalid Update!" })
    // }
    try {
        const _id = req.params.id;
       // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
       const task = await Task.findByIdAndUpdate(_id)
       updates.forEach(update => task[update] = req.body[update])
       if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a Task

router.delete("/task/:id",async (req, res) => {
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

module.exports = router;