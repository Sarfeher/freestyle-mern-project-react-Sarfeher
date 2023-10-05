import './App.css'
import { Link } from "react-router-dom";

function App() {


  return (
    <div> 
      <button><Link to="/ranch">Go to Ranch</Link></button>
      <button><Link to="/fight">Go to Fight</Link></button>
    </div>
  )
}

export default App
