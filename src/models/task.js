const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true,
        trim : true,
        toLowearcase:true
    },
    complete : {
        type : Boolean,
        default : false
    }
})

taskSchema.pre("save",async function (next) {
    const task = this;
    next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task;