import mongoose from "mongoose"
export const dbConnect=async()=>{
   const conn= await  mongoose.connect('mongodb+srv://srishtitripathi67_db_user:bARHfn92Aym6BRFy@quirex-db.gdhicd6.mongodb.net/?appName=Quirex-db');
   if(conn){
    console.log("Db connected successfully............"); 
   }
}