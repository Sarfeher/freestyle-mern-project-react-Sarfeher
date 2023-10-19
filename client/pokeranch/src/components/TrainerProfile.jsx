import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const fetchPokemon = async () => {
    const response = await fetch("/api/ranch")
    return response.json();
}

const fetchTrainer = (id) => {
    return fetch(`/api/trainers/${id}`).then((res) => res.json());
}

const addPokemon = (pokeId, trainerId) =>{
    return fetch(`/api/trainers/${trainerId}`,{
        method:'POST',
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({pokeId})
    }).then((res)=>res.json());
}

function TrainerProfile() {
    const trainerId = useParams().id;
    const [trainer, setTrainer] = useState(null);
    const [pokemon, setPokemon] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState('');

    

    useEffect(() => {
        Promise.all([fetchPokemon(), fetchTrainer(trainerId)])
            .then(([pokemon, trainer]) => {
                setPokemon(pokemon);
                setTrainer(trainer);
            });
    }, [])
    console.log(selectedPokemon)
    return (
        <div>
            {trainer && (
                < div key={trainer._id} className="pokemon-data" >
                    <h2> {trainer.name} </h2>
                    <h2> {trainer.age} </h2>
                    <img src={trainer.pokemon[0].front}></img>
                </div >
            )}
            {pokemon &&
                <div>
                    <select value={selectedPokemon} onChange={(e) => setSelectedPokemon(e.target.value)}>
                        {pokemon?.map((poke) => {
                            return <option key={poke._id} value={poke._id}>{poke.name}</option>;
                        })}
                    </select>
                   {/*  {selectedPokemon&&
                    <img src={selectedPokemon.front}></img>
                    } */}
                    <button onClick={()=>addPokemon(selectedPokemon, trainerId)}>I want this one!</button>
                </div>
            }
        </div>
    )
}

export default TrainerProfile



{/* <select onChange={(e) => setSelectedPokemon(e.target.value)}>
                    {pokemons?.map((pokemon) => {
                        return <option key={pokemon._id} value={pokemon._id}>{pokemon.name}</option>;
                    })}
                </select> */}