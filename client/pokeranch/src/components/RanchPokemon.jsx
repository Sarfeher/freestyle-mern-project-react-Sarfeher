import { Link } from "react-router-dom"
import { useEffect, useState } from "react";






function RanchPokemon({ pokemon }) {
    const [position, setPosition] = useState({ left: getRandomNumber(-400, 400), top: getRandomNumber(0, 400) })
    const [scaleX, setScaleX] = useState({ transform: `scaleX(${1})` })
    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

    function switchSign(num) {
        return Math.sign(num) === 1 ? -Math.abs(num) : Math.abs(num)
    }

    useEffect(() => {
        const moveRandomly = () => {
            const left = getRandomNumber(-10, 10);
            const top = getRandomNumber(-10, 10);

            setPosition(prevPosition => ({
                left: prevPosition.left + left,
                top: prevPosition.top + top,
            }));
            setTimeout(moveRandomly, getRandomNumber(500, 3000));
            left !== 0 ? setScaleX({ transform: `scaleX(${switchSign(Math.sign(left))})` }) : null
        };
        moveRandomly();

    }, []);

    const style = {
        position: "relative",
        left: `${position.left}px`,
        top: `${position.top}px`,

    }

    return (
        <div className="pokemon" style={style} key={pokemon._id}>
            <div className="pokemonNickname" name={pokemon._id} >{pokemon.nickName}
            </div>
            <Link to={`/pokemon/${pokemon._id}`}><img style={scaleX} className="ranchPics" name={pokemon._id} src={pokemon.front}>
            </img>
            </Link>
        </div>
    )
}


export default RanchPokemon