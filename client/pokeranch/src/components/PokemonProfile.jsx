import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './PokemonProfile.css'

/* const id = '651abe794c96a3647338edf6'
 */
async function fetchThePokemon(id) {
    const response = await fetch(`/api/pokemon/${id}`)
    const pokemon = await response.json()
    return pokemon
}

async function fetchToUpdatePokemon(id, nickName, hp, attack) {
    await fetch(`/api/pokemon/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'nickName': nickName,
            'hp': hp,
            'attack': attack
        })
    })
}
function PokemonProfile() {
    const params = useParams();
    const id = params.id;
    const [pokemon, setPokemon] = useState(null)
    const [editedNickName, setEditedNickName] = useState('')
    const [editedHp, setEditedHp] = useState(null)
    const [editedAttack, setEditedAttack] = useState(null)
    const [editingName, setEditingName] = useState(false)

    useEffect(() => {
        async function fetchPokemon(id) {
            const fetchedPokemon = await fetchThePokemon(id)
            setPokemon(fetchedPokemon)
            setEditedHp(fetchedPokemon.hp)
            setEditedAttack(fetchedPokemon.attack)
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

console.log(editedAttack);
    return (
        <div className="pokemon-profile-container">
            {pokemon && <div key={pokemon._id} className="pokemon-data">
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <h3>{pokemon.nickName}</h3>
                {editingName
                    ? <div><input type="text" value={editedNickName} onChange={onTextChange} />
                        <button type="button" onClick={async () => {
                            await fetchToUpdatePokemon(id, editedNickName),
                                setEditingName(false),
                                setPokemon(await fetchThePokemon(id))
                        }} >Save</button>
                        <button onClick={cancelEdit}>Cancel</button></div>
                    : <button onClick={() => handleEdit(!editingName)}>Set nick name</button>}
                <h5>Hp: {pokemon.hp}</h5>
                <h5>Attack: {pokemon.attack}</h5>
                <h5>Defense: {pokemon.defense}</h5>
                <h5>Xp: {pokemon.xp}</h5>
                <div>
                    <button onClick={async () => {
                        const newHp = editedHp + 5
                        setEditedHp(editedHp + 5)
                        await fetchToUpdatePokemon(id, undefined, newHp)
                        setPokemon(await fetchThePokemon(id)
                        )
                    }}>Feed me for extra Hp!</button>
                    <button onClick={async () => {
                        const newAttack = editedAttack + 5
                        setEditedAttack(editedAttack + 5)
                        await fetchToUpdatePokemon(id, undefined, undefined, newAttack)
                        setPokemon(await fetchThePokemon(id))
                    }}>Pet me for extra Attack!</button>
                    
                </div>
            </div>}
            {pokemon && (
                <div className="pokemon-image">
                    <img src={pokemon.front} alt={pokemon.name} />
                </div>
            )}
        </div>
        
    )
}

export default PokemonProfile