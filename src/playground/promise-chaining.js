const User = require("../models/user")
require("../db/mongoose")

User.findByIdAndUpdate("62cfb8e57240df8e958b0a1c",{age : 21}).then((res)=>{
    console.log(res);
    return User.countDocuments({age : 15})
}).then((count)=>{
    console.log(count);
}).catch((error)=>{
    console.log(error);
})