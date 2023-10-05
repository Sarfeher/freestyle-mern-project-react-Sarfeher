import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import './PokemonProfile.css'
import './pictures/hart.gif'

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
    const [displayHeart, setDisplayHeart] = useState(false)

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


    /* function handleHeartDisplay(displayHeart) {
        displayHeart ? 

    } */
    console.log(editedAttack);
    return (
        <div className="pokemon-profile-container">
            {pokemon && <div key={pokemon._id} className="pokemon-data">
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <h2>{pokemon.nickName}</h2>
                {editingName
                    ? <div><input type="text" value={editedNickName} onChange={onTextChange} />
                        <button type="button" onClick={async () => {
                            await fetchToUpdatePokemon(id, editedNickName),
                                setEditingName(false),
                                setPokemon(await fetchThePokemon(id))
                        }} >Save</button>
                        <button onClick={cancelEdit}>Cancel</button></div>
                    : <button onClick={() => handleEdit(!editingName)}>Set nick name</button>}
                <h3>Hp: {pokemon.hp}</h3>
                <h3>Attack: {pokemon.attack}</h3>
                <h3>Defense: {pokemon.defense}</h3>
                <h3>Xp: {pokemon.xp}</h3>
                <div>
                    <button onClick={async () => {
                        const newHp = editedHp + 5
                        setEditedHp(editedHp + 5)
                        await fetchToUpdatePokemon(id, undefined, newHp)
                        setPokemon(await fetchThePokemon(id)
                        )
                        setDisplayHeart(true)
                        setTimeout(() => {
                            setDisplayHeart(false)
                        }, "2000")
                    }}>Feed me for extra Hp!</button>
                    <button onClick={async () => {
                        const newAttack = editedAttack + 5
                        setEditedAttack(editedAttack + 5)
                        await fetchToUpdatePokemon(id, undefined, undefined, newAttack)
                        setPokemon(await fetchThePokemon(id))
                        setDisplayHeart(true)
                        setTimeout(() => {
                            setDisplayHeart(false)
                        }, "2000")
                    }}>Pet me for extra Attack!</button>
                    <Link to="/ranch">
                        <button> Go back to the ranch</button>
                    </Link>
                </div>
            </div>}
            {pokemon && (
                <div className="pokemon-image">
                    <div className="image-container">
                        {displayHeart && <img className="heart" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWxja3U0M3Ntem5xd2pqaW84aTJoZ2xiZWJ1OXk2Z3h1djVtOGlzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vzebc2BnJ4HZoCDSQy/giphy.gif" />}
                        <img className="profile-img" src={pokemon.front} alt={pokemon.name} />
                    </div>
                </div>
            )}
        </div>

    )
}

export default PokemonProfile