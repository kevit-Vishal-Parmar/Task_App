const express = require("express");
const User = require("./models/user");
require("./db/mongoose")
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())

app.post("/users",(req,res)=>{
    const user = new User(req.body);

    user.save().then(()=>{
        res.send(user)
    }).catch((error)=>{
        res.status(400)
        res.send(error.message)
    })
})

app.listen(PORT,()=>{
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})