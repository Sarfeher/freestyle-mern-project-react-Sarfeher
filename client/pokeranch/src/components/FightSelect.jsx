import React, { useState, useEffect } from "react";
import Fight from "./Fight";

function FightSelect() {
    const [selectedPoke, setSelectedPoke] = useState(null);
    const [pokeList, setPokeList] = useState(null)
    const fetchPokeList = async () => {
        try {
            const res = await fetch('/api/pokemon/fight', {
                method: 'GET',
            });
            const data = await res.json();
            setPokeList(data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchPokeList();



    return (
        <ul>
            {pokeList ? pokeList.map((poke) => {

                <li key={poke._id} onClick={setSelectedPoke(poke)}>
                    <h3>
                        {poke.name}
                    </h3>
                    <img src={poke?.sprites.versions['generation-v']['black-white'].animated.front_default} />
                </li>
            })
                : selectedPoke ? <Fight poke={selectedPoke} />
                : <li>Loading...</li>
            }

        </ul>

    );

}
export default FightSelect;