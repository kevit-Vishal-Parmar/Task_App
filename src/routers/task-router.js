const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");
const Task = require("../models/task");
const router = new express.Router();

//* Add New Task

router.post("/tasks", auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        // const task = new Task(req.body);
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

//* Get All Tasks.

router.get("/tasks", auth,async (req, res) => {
    try {
        const tasks = await Task.find({owner : req.user._id})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Get One Task

router.get("/task/:id", auth,async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({_id,owner : req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Update Task

router.patch("/task/:id",auth, async (req, res) => {
    const allowedUpdate = ["description", "complete"];
    const updates = Object.values(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))
    
    if (!isValidation) {
        return res.status(400).send({ error: "Invalid Update!" })
    }
    try {
        const _id = req.params.id;
        const task = await Task.findOne({_id : _id,owner : req.user._id})

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a Task

router.delete("/task/:id",auth ,async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndDelete({_id : _id , owner  : req.user._id});
        if (!task) {
            res.status(404).status({ error: "Task Is Not Exits" })
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;