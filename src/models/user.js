const mongoose = require("mongoose")
const validator = require("validator");


const User = mongoose.model('User',{
    name:{
        type : String
    },
    age:{
        type : Number
    },
    email : {
        type : String,
        required:true,
        validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is Invalid");
        }
    }},
    password:{
        type:String,
        required:true,
        minlength : 6,
        maxlength : 12,
        trim : true
    }
})


module.exports = User;