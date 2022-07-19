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
    const updates = Object.values(allowedUpdate);
    const isValidation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidation) {
        return res.status(400).send({ error: "Invalid Update!" })
    }
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