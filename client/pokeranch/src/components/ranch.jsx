import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonList from "./PokemonList";
import "./Ranch.css"
import RanchPokemon from "./RanchPokemon";



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

        <div><button onClick={() => setPokemonList(!pokemonList)} className="showAll">show all</button>
            {pokemonList && <PokemonList />}</div>
        {allPokemon && allPokemon.map(pokemon => <RanchPokemon key={pokemon._id} pokemon={pokemon} />)
        }
    </div >)
}

export default Ranch;
