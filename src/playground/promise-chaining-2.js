const User = require("../models/user")
require("../db/mongoose")

User.findByIdAndRemove("62cfbb8a6f8753a3f8627eca").then((res)=>{
    console.log(res);
    return User.countDocuments();
}).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})