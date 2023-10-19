import express from "express";
import mongoose from "mongoose";
import Pokemon from "./model/Pokemon.js";
import PokemonTrainer from "./model/profile.model.js"

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://sarfeher:Toyotacorolla20201.8@sarfeher.hft4jys.mongodb.net/pokemon")
.then(()=>{
    app.listen(3000, () => {
        console.log('Im in! Open this link: http://127.0.0.1:3000');
    })
})

/* PokemonTrainer.create({
    name: 'Bálint',
    age: "23 ",
   
},
{
    name: 'Zsolti',
    age: "27 ",
   
},
{
    name: 'Krisztián',
    age: "33 ",

}
)
 */

app.get('/api/pokemon/:id', async (req, res) =>{
    const pokemon = await Pokemon.findById(req.params.id);

    res.json(pokemon)
})

app.get('/api/trainers/', async (req, res) => {
    const trainers = await PokemonTrainer.find();
    res.json(trainers)
})

app.get('/api/trainers/:trainerId', async (req, res) =>{
    const id = req.params.trainerId;
    const trainer = await PokemonTrainer.findById(id).populate('pokemon');
    res.json(trainer);
})

app.get("/api/ranch", async(req, res) => {
    const AllPokemon = await Pokemon.find({})
    res.send(AllPokemon)
    res.status(200)
})

app.get('/api/fight', async (req, res) =>{
    const pokeArray = await Pokemon.find({});
  /*   res.json(pokeArray); */
    res.status(200).json(pokeArray)
});
app.post('/api/fight/add',async (req, res)=>{
    const name = req.body.name;
    const nickName = "";
    const front = req.body.front;
    const back = req.body.back;
    const hp = req.body.hp;
    const attack = req.body.attack;
    const defense = req.body.defense;
    const xp = req.body.xp;
    const newPoke = new Pokemon({
        name,
        nickName,
        front,
        back,
        hp,
        attack,
        defense,
        xp,
    });
    await newPoke.save()
   res.status(200).json(newPoke)
})

app.post('/api/trainers/:trainerId', async (req, res, next)=>{
    const trainerId = req.params.trainerId;
    const pokeId = req.body.pokeId;
    try{
        const trainer = await PokemonTrainer.findById(trainerId)
        trainer.pokemon.push(pokeId);
        trainer.save();
        res.json(trainer);
    }catch(err){
        return next(err);
    }
})
app.patch('/api/fight/exp', async (req, res)=>{
    const extraXP = parseInt(req.body.extraXP);
    const updatedPoke = await Pokemon.findByIdAndUpdate(req.body._id, {xp: extraXP},{new:true})
        res.status(200).json(updatedPoke)

})



app.get('/api/pokemon/:id', async (req, res) =>{
   
    const pokemon = await Pokemon.findById(req.params.id);
    res.status(200).json(pokemon)
})

app.patch('/api/pokemon/:id', async (req, res) => {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(pokemon)
})

app.delete('/api/pokemon/:id', async(req, res)=>{
    const poke = await Pokemon.findByIdAndDelete(req.params.id)
    res.status(200).json(poke)
})


