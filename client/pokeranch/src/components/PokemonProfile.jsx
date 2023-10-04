import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

/* const id = '651abe794c96a3647338edf6'
 */
async function fetchThePokemon(id){
    console.log(id);
    const response = await fetch(`/api/pokemon/${id}`)
    const pokemon = await response.json()
    return pokemon
}

async function fetchToUpdatePokemon(id, nickName, hp, attack) {
    await fetch(`/api/pokemon/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application-json'
        },
        body: {
            'pokemon.nickName': nickName,
            'pokemon.hp': hp,
            'pokemon.attack': attack
        }
    })
}
function PokemonProfile() {
      const params = useParams();
      const id = params.id;
    console.log(id);
    const [pokemon, setPokemon] = useState(null)
    const [editedNickName, setEditedNickName] = useState(null)
    const [editedHp, setEditedHp] = useState(null)
    const [editedAttack, setEditedAttack] = useState(null)
    const [editingName, setEditingName] = useState(false)

    useEffect(() => {
        async function fetchPokemon(id) {
            setPokemon(await fetchThePokemon(id))
        }
        fetchPokemon(id)
    }, [id])

    function handleEdit() {
        setEditingName(true)
    }

    function cancelEdit() {
        setEditingName(false)
    }

    function onTextChange(e) {

        setEditedNickName(e.target.value)
    }

    return (
        <div>
            {pokemon && <div key={pokemon._id}>
                <h2>{pokemon.name}</h2>
                <h3>{pokemon.nickName}</h3>
               {editingName 
               ? <div><input type="text" value={editedNickName} onChange={onTextChange} />  <button type="submit" onSubmit={fetchToUpdatePokemon(editedNickName)} >Save</button> <button onClick={cancelEdit}>Cancel</button></div>
               : <button onClick={() => handleEdit(!editingName)}>Set nick name</button>}
                <p>Hp: {pokemon.hp}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Defense: {pokemon.defense}</p>
                <p>Xp: {pokemon.xp}</p>
                <img src={pokemon.front} />
                <div>
                    <button>Feed me for extra Hp!</button>
                    <button>Caress me for extra Attack!</button>
                </div>
            </div>}
        </div>
    )
}

export default PokemonProfile