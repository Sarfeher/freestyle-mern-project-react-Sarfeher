import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonList from "./PokemonList";



function Ranch() {
    const [allPokemon, setAllPokemon] = useState("");
    const [position, setPosition] = useState();
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

    useEffect(() => {
        function asd() {
            setTimeout(() => {
                setPosition(position + 10);
                console.log(position)
            }, "1000");
        }
        asd()
    }, [position])


    return (<div className="ranch">

        <div><button onClick={()=>setPokemonList(!pokemonList)} className="showAll">show all</button>{pokemonList && <PokemonList />}</div>
        {allPokemon && allPokemon.map(pokemon => <div className="pokemon" style={{ translate: `${position}%`, }} key={pokemon._id}>
            <div name={pokemon._id} >{pokemon.nickName}
            </div>
            <Link to={`/pokemon/${pokemon._id}`}><img name={pokemon._id} src={pokemon.front}>
            </img>
            </Link>
        </div>)
        }
    </div >)
}


export default Ranch;