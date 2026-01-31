import express from 'express';
import {dbConnect} from './config/db.js';
import router from './route/userRoute.js';
import adminRoute from './route/adminRoute.js'
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose"
const app=express();
dotenv.config();


app.use(express.json());
app.use(fileUpload());
app.use(cors());


const PORT=9000; 
// dbConnect();
// mongoose.connect(process.env.Mongo_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=> console.log('Db Connected.....'))
// .catch((err)=> console.log('Db connection failed:', err) );

const isConnected = false;
 async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.Mongo_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    isConnected = true;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

//add middleware
app.use((req, res, next) => {
  if (!isConnected) {
    connectToDatabase();
  }
  next();
});



 app.use('/img', express.static('uploads'));
 app.use('/api',router);
 app.use('/api',adminRoute)

// app.listen(PORT,()=>{
//     console.log("Server running..."); 
// })

export default app;
