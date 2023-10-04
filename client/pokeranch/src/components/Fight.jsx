import React, { useState, useEffect } from "react";
import FightSelect from "./FightSelect";
/* TODO

capture scene
render/2
make site work
post capd poke
change own poke xp
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

    
    return (
        <>
        </>
    );
}
export default Fight;