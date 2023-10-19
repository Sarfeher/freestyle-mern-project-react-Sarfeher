import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PokemonTrainerSchema = new Schema({
  name: String,
  age: Number,
  pokemon: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
});

export default model("PokemonTrainer", PokemonTrainerSchema);
