import React, { useState, useEffect } from "react";
import Fight from "./Fight";


function FightSelect() {
    const [backToStart, setBackToStart] = useState(false)
    const [ready, setReady] = useState(false);
    const [enemyPoke, setEnemyPoke] = useState(null);
    const [selectedPoke, setSelectedPoke] = useState(null);
    const [pokeList, setPokeList] = useState(null);

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

    const enemyPokeID = Math.floor(Math.random() * 1018);

    const fetchEnemyPoke = async (ID) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
        const jsonData = await response.json();
        setEnemyPoke(jsonData);
    };
    fetchEnemyPoke(enemyPokeID);



    return (
        <>

            {ready ?
                (<ul>

                    {pokeList ? pokeList.map((poke) => {

                        <li key={poke._id} onClick={setSelectedPoke(poke)}>
                            <h3>
                                {poke.name}
                            </h3>
                            <img src={poke?.front} />
                        </li>
                    })
                        : selectedPoke ? <Fight poke={selectedPoke} enemyPoke={enemyPoke} onBackToStart={()=>{setBackToStart(true)}} />
                            : <li>Loading...</li>
                    }

                </ul>)
                : enemyPoke ? <div>

                    <h2>A wild {enemyPoke.name} has appeared!</h2>
                    <img src={enemyPoke?.sprites.versions['generation-v']['black-white'].animated.front_default} />
                    <ul> With the following stats:
                        <li>HP: {enemyPoke.stats[0].base_stat}</li>
                        <li>Attack: {enemyPoke.stats[1].base_stat}</li>
                        <li>Defence: {enemyPoke.stats[2].base_stat}</li>
                    </ul>
                    <div>Are you ready?</div>
                    <button onClick={() => setReady(true)}> Yes!</button>
                </div>
                    : <>Loading...</>

            }
        </>
    );

}
export default FightSelect;