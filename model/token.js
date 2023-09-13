import mongoose from "mongoose";


const tokenschema = mongoose.Schema({
    token :{
        type:String,
        required:true
    }
})

const tokenSchema = mongoose.model("tokenSchema" , tokenschema);

export default tokenSchema;