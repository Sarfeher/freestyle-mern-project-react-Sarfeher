import express from "express";
import mongoose from "mongoose";
import Pokemon from "./model/Pokemon.js";

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sarfeher:Toyotacorolla20201.8@sarfeher.hft4jys.mongodb.net/pokemon")


app.get("api/ranch", (res,req)=>{
    const pokemon = Pokemon.find()
    console.log(pokemon)
})





app.get('/api/pokemon/:id', async (req, res) =>{
    const pokemon = await Pokemon.findById(req.params.id);
    console.log(pokemon);
    res.json(pokemon)
})

app.listen(3000, () => {
    console.log('Im in! Open this link: http://127.0.0.1:3000');
})