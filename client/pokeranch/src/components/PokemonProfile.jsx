import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

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
        <div>
            {pokemon && <div key={pokemon._id}>
                <h2>{pokemon.name}</h2>
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
                <p>Hp: {pokemon.hp}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Defense: {pokemon.defense}</p>
                <p>Xp: {pokemon.xp}</p>
                <img src={pokemon.front} />
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
                    }}>Caress me for extra Attack!</button>
                </div>
            </div>}
        </div>
    )
}

export default PokemonProfile