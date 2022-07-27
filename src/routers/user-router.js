const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const sharp = require("sharp");
const router = new express.Router();
const multer = require("multer");
// require("../db/mongoose")

//* Add New User

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generatAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//* Get All Users.

router.get("/user/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    console.log(e);
  }
});
//* Update User.

router.patch("/user/me", auth, async (req, res) => {
  const allowedUpdate = ["name", "age", "email", "password"];
  const updates = Object.values(allowedUpdate);
  const isValidation = updates.every((update) =>
    allowedUpdate.includes(update)
  );

  if (!isValidation) {
    return res.status(400).send({ error: "Invalid Update!" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//*Delete a User

router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

//* Login User By Using Email and Password

router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generatAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ Error: e });
  }
});

//* Logout User.

router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ Message: "Logout SuccessFully." });
  } catch (e) {
    res.status(500).send(e);
  }
});

//* Logout All

router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

//* Add File Upload Module to Upload file into a Folder of Database.

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Upload Only Image."));
    }
    cb(undefined, true);
  },
});
//* Route to Upload Image Into a Database.
router.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1500, height: 800 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//* Router to Delete a Image Form the Database.

router.delete(
  "/user/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

//*Router to Get a Image from Database Using Id.

router.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {}
});

module.exports = router;
