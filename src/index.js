const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
require("./db/mongoose")
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

//* Add New User

app.post("/users",(req,res)=>{
    const user = new User(req.body);

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

//* Get All Users.

app.get("/users",(req,res) => {
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//* Get One User.

app.get("/user/:id",(req,res)=>{
    const _id = req.params.id;

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send()
    })
})

//* Add New Task

app.post("/tasks",(req,res)=>{
    const task = new Task(req.body);

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

//* Get All Tasks.

app.get("/tasks",(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.status(200).send(tasks)
    }).catch((error)=>{
        res.status(500).send()
    })
})

//* Get One Task

app.get("/task/:id",(req,res)=>{
    const _id = req.params.id;

    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error)=>{
        res.status(500).send()
    })
})
//! Listen App In Port

app.listen(PORT,()=>{
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})