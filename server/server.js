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

app.get('/api/pokemon/fight',(req, res) =>{
    const pokeArray = Pokemon.find({});
    res.json(pokeArray);
    res.status(200).json({success: true})
});
app.post('/api/pokemon/fight/add',(req, res)=>{
    const name = req.body.name;
    const nickname = "";
    const front = req.body.front;
    const back = req.body.back;
    const hp = req.body.hp;
    const attack = req.body.attack;
    const defence = req.body.defence;
    const xp = req.body.xp;
    const newPoke = new Pokemon({
        name,
        nickname,
        front,
        back,
        hp,
        attack,
        defence,
        xp,
    });
    newPoke.save()
    .then(console.log(newPoke))
    .catch(err => res.status(500).json({success: false}))
})
app.patch('/api/pokemon/fight/exp',(req, res)=>{
    const extraXP = req.body.extraXP;
    Pokemon.findOneAndUpdate(
        { _id: req.body._id },
        { xp: xp + extraXP },
        { new: true, runValidators: true },  
        )
})
app.listen(3000, () => {
    console.log('Im in! Open this link: http://127.0.0.1:3000');
})