import './App.css'
import { Link } from "react-router-dom";

function App() {


  return (
    <div> 
      <Link to="/ranch">Ranch</Link>
      <Link to="/pokemon">PokemonProfile</Link>
      <Link to="/fight">Battle!</Link>
      <button><Link to="/ranch">Go to Ranch</Link></button>
      <button><Link to="/fight">Go to Fight</Link></button>
    </div>
  )
}

export default App
