import React, { useState, useEffect } from "react";
import Fight from "./Fight";


function FightSelect() {
    const [backToStart, setBackToStart] = useState(false)
    const [ready, setReady] = useState(false);
    const [enemyPoke, setEnemyPoke] = useState(null);
    const [selectedPoke, setSelectedPoke] = useState(null);
    const [pokeList, setPokeList] = useState(null);

    const [restart, setRestart] = useState(0);
    useEffect(() => {
        const abortController = new AbortController();
        const fetchPokeList = async () => {
            const response = await fetch('/api/fight',);

            const data = await response.json();
            setPokeList(data);
        }
        fetchPokeList();


        const enemyPokeID = Math.floor(Math.random() * 650);

        const fetchEnemyPoke = async (ID) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`, { signal: abortController.signal });

            const jsonData = await response.json();
            setEnemyPoke(jsonData);
        };
        fetchEnemyPoke(enemyPokeID);

        return () => {
            abortController.abort();
        }
    }, [restart])
    console.log(selectedPoke)
    console.log(backToStart, ready)
    const handleReset = () => {
        setReady(false);
        setEnemyPoke(null);
        setPokeList(null);
        setSelectedPoke(null);
        setBackToStart(false);
        setRestart(restart + 1);
    }

    return (
        <>

            {ready ?
                (<ul>

                    {(pokeList && !selectedPoke) && pokeList.map((poke) => {
                        return (

                            <div key={poke._id} onClick={() => { setSelectedPoke(poke) }}>
                                <h3>
                                    {poke.name}
                                </h3>
                                <img className="fightPic" src={poke?.front} />
                            </div>
                        )
                    })

                    }
                    {selectedPoke && <Fight poke={selectedPoke} enemyPoke={enemyPoke} onBackToStart={() => { handleReset() }} />
                    }
                </ul>)
                : enemyPoke ? <div className="pokemon-enemy-container">
                    <div className="enemy-data">
                        <h2>A wild {enemyPoke.name.charAt(0).toUpperCase() + enemyPoke.name.slice(1)} has appeared!</h2>
                        <h4> With the following stats: </h4>
                        <h3>HP: {enemyPoke.stats[0].base_stat}</h3>
                        <h3>Attack: {enemyPoke.stats[1].base_stat}</h3>
                        <h3>Defence: {enemyPoke.stats[2].base_stat}</h3>
                        <button onClick={() => setReady(true)}> Lets fight with {enemyPoke.name.charAt(0).toUpperCase() + enemyPoke.name.slice(1)}!</button>
                    </div>
                    <div className="enemy-image">
                        <img className="enemy-img" src={enemyPoke?.sprites.versions['generation-v']['black-white'].animated.front_default} />
                    </div>

                </div>
                    : <>Loading...</>

            }
        </>
    );

}
export default FightSelect;