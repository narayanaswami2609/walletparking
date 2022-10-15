import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    // name, age, gender, phoneNumber
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
},{
    timestamp:true
})

const User = mongoose.model("User", userSchema)
export default User
