const express = require("express");
const User = require("../models/user");
const router = new express.Router();
// require("../db/mongoose")

//* Add New User

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//* Get All Users.

router.get("/users", async (req, res) => {
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

router.get("/user/:id", async (req, res) => {
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

router.patch("/user/:id", async (req, res) => {
    const allowedUpdate = ["name", "age", "email", "password"];
    const updates = Object.keys(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    // if (!isValidation) {
    //     return res.status(400).send({ error: "Invalid Update!" })
    // }
    try {
        const _id = req.params.id;
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        const user = await User.findByIdAndUpdate(_id);

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()

        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a User

router.delete("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            res.status(404).status({ error: "User Is Not Exits" })
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router