import express from "express";
import mongoose from "mongoose";

const app = server()
app.use(express.json())

mongoose.connect("mongodb+srv://sarfeher:Toyotacorolla20201.8@sarfeher.hft4jys.mongodb.net/pokemon")



app.listen(3000, () => {
    console.log('Im in! Open this link: http://127.0.0.1:3000');
})