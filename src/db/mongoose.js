const mongoose = require("mongoose")
const validator = require("validator");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true
})

/*const User = mongoose.model('User',{
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

const me = new User({
    name :"Vishal",
    age : 20,
    email:"vparmar431@rku.ac.in",
    password:"1"
})

me.save().then(()=>{
    console.log(me);
}).catch((error)=>{
    console.log("Not Inserted",error.message);
})*/

/* const Tasks = mongoose.model("Tasks",{
    description : {
        type: String,
        required  : true,
    },
    complete : {
        type : Boolean,
        // required:true,
        default : true
    }
})


const task1 = new Tasks({
    description  : "Complete Work",
    // complete:''
})

task1.save().then(()=>{
    console.log(task1);
}).catch((error)=>{
    console.log(error);
})*/