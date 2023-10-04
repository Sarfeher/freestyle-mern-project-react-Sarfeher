import React, { useState, useEffect } from "react";
import FightSelect from "./FightSelect";
/* TODO
render/2
make site work
css
*/

function Fight(props) {

    const enemyPoke = props.enemyPoke;
    const [weAreTheAttacker, setWeAreTheAttacker] = useState(true);
    const [enemyPokemonHP, setEnemyPokemonHP] = useState(enemyPoke.stats[0].base_stat);
    const [ourPokemonHP, setOurPokemonHP] = useState(ourPokemon.hp);
    const ourPokemon = props.poke;

    const damage = () => {
        const dmg = weAreTheAttacker ? Math.floor(((((2 / 5 + 2) * ourPokemon.attack * 60 / enemyPoke.stats[2].base_stat) / 50) + 2) * (Math.floor(Math.random() * (255 - 217)) + 217) / 255)
            : Math.floor(((((2 / 5 + 2) * enemyPoke.stats[1].base_stat * 60 / ourPokemon.defence) / 50) + 2) * (Math.floor(Math.random() * (255 - 217)) + 217) / 255)
        return Math.floor(dmg);
    }



    useEffect(() => {
        setTimeout(() => {
            weAreTheAttacker ? setEnemyPokemonHP(enemyPokemonHP - damage())
                : setOurPokemonHP(ourPokemonHP - damage());
            if (enemyPokemonHP > 0 && ourPokemonHP > 0) {
                setWeAreTheAttacker(!weAreTheAttacker);
            }
            console.log(enemyPokemonHP)
            console.log(ourPokemonHP)
        }, 500);
    }, [weAreTheAttacker])

    const capturePokemon = async () => {
        fetch('/api/pokemon/fight/add', {
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

    const xpGained = {extraXP: 100,
    _id: ourPokemon._id};

    const updateXp = () =>{
        fetch('/api/pokemon/fight/exp', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json',
       },
      body: JSON.stringify(updateXp)
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
            {backToMain ? 
                : enemyPokemonHP <= 0 || ourPokemonHP <= 0 ?
                    ourPokemonHP <= 0 ? <>You Lost!
                        {setTimeout(() => {
                            setBackToMain(true)
                        }, 1000)}
                    </>
                        : enemyPokemonHP <= 0 ? <>
                            You won!
                            <button onClick={() => {
                                capturePokemon(loot)

                            }}>Capture!</button>
                        </>
                            : false
                    : <>
                        <h2>{enemyPokemon.name.toUpperCase()} {enemyPokemonHP} / {enemyPokemon.stats[0].base_stat}</h2>
                        <img src={enemyPoke?.sprites.versions['generation-v']['black-white'].animated.front_default} />
                        <h2>{ourPokemon.name.toUpperCase()} {ourPokemonHP} / {ourPokemon.stats[0].base_stat}</h2>
                        <img src={ourPokemon?.sprites.versions['generation-v']['black-white'].animated.back_default} />
                    </>
            }
        </>
    );
}
export default Fight;