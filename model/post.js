import  mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true,
     
    },
    picture:{
        type : String,
        required:false
   
    },
    name:{
        type : String,
        required:true
   
    },
    categories:{
        type : String,
        required:true
   
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('post' , postSchema);
export default Post;

