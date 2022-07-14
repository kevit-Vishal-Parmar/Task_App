const express = require("express");
const userRouter = require("./routers/user-router")
const taskRouter = require("./routers/task-router")
const PORT = process.env.PORT || 3000
const app = express();
require("./db/mongoose")

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//! Listen App In Port

app.listen(PORT, () => {
    console.log(`App Is Listen On ${PORT} Go To:- http://localhost:${PORT}/users`);
})