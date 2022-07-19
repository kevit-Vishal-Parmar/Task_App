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
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref : 'User'
    }
})

taskSchema.pre("save",async function (next) {
    const task = this;
    next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task;