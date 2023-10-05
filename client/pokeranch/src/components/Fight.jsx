import React, { useState, useEffect } from "react";
/* TODO
render/2
make site work
css
*/

function Fight(props) {

    const enemyPoke = props.enemyPoke;
    const ourPoke = props.poke;
    const [weAreTheAttacker, setWeAreTheAttacker] = useState(true);
    const [enemyPokemonHP, setEnemyPokemonHP] = useState(enemyPoke.stats[0].base_stat);
    const [ourPokemonHP, setOurPokemonHP] = useState(ourPoke.hp);
    const damage = () => {
        const dmg = weAreTheAttacker ? Math.floor(((((2 / 5 + 2) * ourPoke.attack * 60 / enemyPoke.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217)) + 217) / 255)
            : Math.floor(((((2 / 5 + 2) * enemyPoke.stats[1].base_stat * 60 / ourPoke.defense) / 50) + 2) * (Math.floor(Math.random() * (255 - 217)) + 217) / 255)
        return parseInt(Math.floor(dmg));
    }



    useEffect(() => {
        setTimeout(() => {
            weAreTheAttacker ? setEnemyPokemonHP(enemyPokemonHP - damage())
                : setOurPokemonHP(ourPokemonHP - damage());
            if (enemyPokemonHP > 0 && ourPokemonHP > 0) {
                setWeAreTheAttacker(!weAreTheAttacker);
            }
            
        }, 500);
    }, [weAreTheAttacker])

    const capturePokemon = async () => {
        fetch('/api/fight/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loot)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const loot = {
        name: enemyPoke.name,
        nickName: "",
        front: enemyPoke.sprites.versions['generation-v']['black-white'].animated.front_default,
        back: enemyPoke.sprites.versions['generation-v']['black-white'].animated.back_default,
        hp: enemyPoke.stats[0].base_stat,
        attack: enemyPoke.stats[1].base_stat,
        defense: enemyPoke.stats[2].base_stat,
        xp: 0,
    }

    const xpGained = {
        extraXP: (ourPoke.xp + 100),
        _id: ourPoke._id
    };

    const updateXp = () => {
        fetch('/api/fight/exp', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(xpGained)
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            {
                enemyPokemonHP <= 0 || ourPokemonHP <= 0 ?
                    ourPokemonHP <= 0 ?
                        <>
                            <h2>You Lost!</h2>
                            <button onClick={()=>{props.onBackToStart();
                            updateXp();
                            
                            }}>Back to start!</button>
                        </>
                        : enemyPokemonHP <= 0 ? <>
                            You won!
                            <button onClick={() => {
                                capturePokemon();
                                props.onBackToStart();
                                updateXp();
                            }}>Capture!</button>
                        </>
                            : false
                    : <>
                        <h2>{enemyPoke.name.toUpperCase()} {enemyPokemonHP} / {enemyPoke.stats[0].base_stat}</h2>
                        <img src={enemyPoke?.sprites.versions['generation-v']['black-white'].animated.front_default} />
                        <h2>{ourPoke.name.toUpperCase()} {ourPokemonHP} / {ourPoke.hp}</h2>
                        <img src={ourPoke?.back} />
                    </>
            }
        </>
    );
}
export default Fight;