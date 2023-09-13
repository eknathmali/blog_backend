import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const USERNAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASS

// const Connection = async(URL) =>{
const Connection = async() =>{
    const url = `mongodb+srv://${USERNAME}:` + encodeURIComponent(PASSWORD) + "@cluster0.bwsjzaf.mongodb.net/dbs";
    // const url ="mongodb://127.0.0.1:27017/blog";
    try{
       await mongoose.connect(URL , {useNewUrlParser : true});
       console.log("Databse connected Successsfully");
    }
    catch(e){
            console.log("Error while connecting with DB " , e);
    }
}

export default Connection;