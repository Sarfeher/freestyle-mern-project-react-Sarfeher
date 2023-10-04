import { useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";

function App() {


  return (
    <div> 
      <Link to="/ranch">Ranch</Link>
      <Link to="/pokemon">PokemonProfile</Link>
    </div>
  )
}

export default App
