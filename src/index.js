const express = require("express");
const userRouter = require("./routers/user-router")
const taskRouter = require("./routers/task-router")
const PORT = process.env.PORT
const app = express();
require("./db/mongoose")

app.use(express.json())

//? User Router To Manage All The Request.

app.use(userRouter)

//? Task Router To Manage All The Request.

app.use(taskRouter)

//! Listen App In Port

app.listen(PORT, () => {
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})