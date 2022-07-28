const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    avatar:{
        type:Buffer
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{timestamps : true});
//Add Task  RelationShip To User.

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Hiding a Private Data.

userSchema.methods.toJSON = function () {
    const user = this
    const ObjUser = user.toObject()

    delete ObjUser.password
    delete ObjUser.tokens

    return ObjUser;
}

// Function To Create a Authantication Token.

userSchema.methods.generatAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN)

    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token;
}

// Check a User Is Exits or Not.Check User Provided Email and Password Is Valid Or Not.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Unable To Login")
    } else {

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error("Invalid Username Or Password")
        }
    }
    return user;
}

// Hash the Plain Text Password Before Saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//Delete A Task When User is Removed

userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next();
})

const User = mongoose.model('User', userSchema)


module.exports = User;