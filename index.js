import "dotenv/config";
import express from "express";
import mongoose from "mongoose";


import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log("err:", err);
  });
  app.use((req, res)=>{
    return res.status(404).json({message:"This endpoint does not exist"})
  })
  app.listen(process.env.PORT, () => {
    console.log(`started at http://${process.env.PORT}`);
  });
  