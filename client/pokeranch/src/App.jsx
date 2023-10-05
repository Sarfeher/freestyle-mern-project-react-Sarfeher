import { useState } from 'react'
import PokemonProfile from './components/PokemonProfile'
import './App.css'
import { Link } from "react-router-dom";

function App() {

  return (
    <div> 
      <Link to="/ranch">Ranch</Link>
      <Link to="/pokemon">PokemonProfile</Link>
      <Link to="/fight">Battle!</Link>
    </div>
  )
}

export default App
