import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Ranch() {
    const [allPokemon, setAllPokemon] = useState("");

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch("/api/ranch")
            const data = await response.json();
            setAllPokemon(data)
            console.log(data)
        }
        fetchPokemon()
    }, [])

    return (<div>
        {allPokemon && allPokemon.map(pokemon => <div key={pokemon._id}>
            <div name={pokemon._id} onClick={(e) => console.log(e.target.name)}>{pokemon.nickName}
            </div>
            <Link to={`pokemon/${pokemon._id}`}><img name={pokemon._id} onClick={(e) => console.log(e.target.name)} src={pokemon.front}>
            </img>
            </Link>
        </div>)}
    </div>)
}


export default Ranch;