import { useEffect, useState } from "react";
import { useParams } from "react-router";


const id = '651abe794c96a3647338edf6'

const fetchThePokemon = async () => {
    const response = await fetch(`/api/pokemon/${id}`)
    const pokemon = await response.json()
    return pokemon
}
function PokemonProfile() {
    const [pokemon, setPokemon] = useState(null)
    const params = useParams();
    console.log(params);

    useEffect(() => {
        async function fetchPokemon() {
            setPokemon(await fetchThePokemon())
        }
        fetchPokemon()
    }, [])

    return(
    <div>
        {pokemon && <div key={pokemon._id}> 
        <h2>{pokemon.name}</h2>
        <h3>{pokemon.nickName}</h3>
        <p>Hp: {pokemon.hp}</p>
        <p>Attack: {pokemon.attack}</p>
        <p>Defense: {pokemon.defense}</p>
        <p>Xp: {pokemon.xp}</p>
        <img src={pokemon.front} />
        </div>}
    </div>
    )
}

export default PokemonProfile