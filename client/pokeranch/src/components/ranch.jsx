import { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import "./Ranch.css"
import RanchPokemon from "./RanchPokemon";
import { Link } from "react-router-dom";


function Ranch() {
    const [allPokemon, setAllPokemon] = useState("");
    const [pokemonList, setPokemonList] = useState(null)


    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch("/api/ranch")
            const data = await response.json();
            setAllPokemon(data)
            console.log(data)
        }
        fetchPokemon()
    }, [])


    return (<div className="ranch">
        <div className="buttonContainer"><button onClick={() => setPokemonList(!pokemonList)} className="showAll">Show All</button>
            <button className="goFight"><Link to="/fight">Go to Fight</Link></button>
        </div>
        <div>{pokemonList && <PokemonList />}</div>

        <div className="pokemonContainer">{allPokemon && allPokemon.map(pokemon => <RanchPokemon key={pokemon._id} pokemon={pokemon} />)
        }</div>
    </div >)
}

export default Ranch;
