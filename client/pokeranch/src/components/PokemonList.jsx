import { useEffect, useState} from "react";
import { Link } from "react-router-dom";



function PokemonList() {
    const [allPokemon, setAllPokemon] = useState("");

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch("/api/ranch")
            const data = await response.json();
            setAllPokemon(data)
        }
        fetchPokemon()
    }, [])

    return (<div>
        {allPokemon && allPokemon.map(pokemon => <div className="listedPokemon" key={pokemon._id}>
        <div name={pokemon._id} >{pokemon.nickName}
        </div>
        <Link to={`/pokemon/${pokemon._id}`}><img name={pokemon._id} src={pokemon.front}>
        </img>
        </Link>
    </div>)
}
    </div >)
}


export default PokemonList;