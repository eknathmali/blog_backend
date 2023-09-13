import express from 'express';
import Connection from './database/db.js';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

const USERNAME = process.env.DB_USER
const PASSWORD = process.env.DB_PASS

app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/' , router);

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static("client/build"))
// }
const PORT = process.env.PORT || 8000;
app.listen(PORT , ()=>{
    console.log(`Server is Running on Port ${PORT}`);
})

// const url = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:` + encodeURIComponent(PASSWORD) + "@cluster0.bwsjzaf.mongodb.net/dbs";
// Connection(URL);
Connection();