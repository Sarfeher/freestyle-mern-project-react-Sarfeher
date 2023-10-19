const fetchPokemon = async () => {
    const response = await fetch("/api/ranch")
    return response.json();}

function TrainerProfile() {
    return (<div> Trainers </div>)
}

export default TrainerProfile



{/* <select onChange={(e) => setSelectedPokemon(e.target.value)}>
                    {pokemons?.map((pokemon) => {
                        return <option key={pokemon._id} value={pokemon._id}>{pokemon.name}</option>;
                    })}
                </select> */}