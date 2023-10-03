import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";



function Ranch() {
    const [allPokemon, setAllPokemon] = useState(null);

    // useEffect(() => {
    //     const fetchPokemon = async()=>{
    //     const response = fetch("api/ranch")
    //     const data = await response.json();
    //     setAllPokemon(data)
    // }
    // fetchPokemon()
    // }, [])

        // {allPokemon? allPokemon.map((pokemon) => pokemon.name) : "loading" }
    return (<div>
        <Link to="/pokemon">Pokemon Profile</Link>
    </div>)
}


export default Ranch;