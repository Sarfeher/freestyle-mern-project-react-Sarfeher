import express from "express";
import mongoose from "mongoose";
import Pokemon from "./model/Pokemon.js";

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sarfeher:Toyotacorolla20201.8@sarfeher.hft4jys.mongodb.net/pokemon")


//Create pokemon from the server
/* Pokemon.create({
    name: 'psyduck',
    nickName: 'beep',
    front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif ",
    back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/54.gif",
    hp: 35,
    attack: 35,
    defense: 35,
    xp: 0,
})
.then(pokemon => {
    console.log(pokemon);
})
.catch(error => {
    console.error(error)
}); */

app.listen(3000, () => {
    console.log('Im in! Open this link: http://127.0.0.1:3000');
})