import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pokemonSchema = new Schema({
    name: String,
    nickName: String,
    front: String,
    back: String,
    hp: Number,
    attack: Number,
    defense: Number,
    xp: Number,

})

export default model('Pokemon', pokemonSchema)