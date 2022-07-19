const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth")
const router = new express.Router();
// require("../db/mongoose")


//* Add New User

router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generatAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//* Get All Users.

router.get("/user/me", auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        console.log(e);
    }
})
//* Update User.

router.patch("/user/me", auth, async (req, res) => {
    const allowedUpdate = ["name", "age", "email", "password"];
    const updates = Object.values(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidation) {
        return res.status(400).send({ error: "Invalid Update!" })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//*Delete a User

router.delete("/user/me", auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//* Login User By Using Email and Password

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generatAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e)
    }
})


//* Logout User.

router.post("/user/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => { return token.token !== req.token })
        await req.user.save()
        res.send({ "Message": "Logout SuccessFully." })
    } catch (e) {
        res.status(500).send(e)
    }
})


//* Logout All 

router.post("/user/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
module.exports = router