import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonList from "./PokemonList";
import "./Ranch.css"



function Ranch() {
    const [allPokemon, setAllPokemon] = useState("");
    const [pokemonList, setPokemonList] = useState(null)
    const [position, setPosition] = useState({ left: getRandomNumber(300, 600), top: getRandomNumber(300, 600 )})

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch("/api/ranch")
            const data = await response.json();
            setAllPokemon(data)
            console.log(data)
        }
        fetchPokemon()
    }, [])



    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)}


        useEffect(() => {
            

            const moveRandomly = () => {
                const left = getRandomNumber(-5, 5);
                const top = getRandomNumber(-5, 5);
                setPosition(prevPosition => ({
                    left: prevPosition.left + left,
                    top: prevPosition.top + top,
                }));

                setTimeout(moveRandomly, 500);
            };

            moveRandomly();

        }, []);

        const style = {
            left: `${position.left}px`,
            top: `${position.top}px`,
        }



        return (<div className="ranch">

            <div><button onClick={() => setPokemonList(!pokemonList)} className="showAll">show all</button>
                {pokemonList && <PokemonList />}</div>
            {allPokemon && allPokemon.map(pokemon => <div className="pokemon" style={style} key={pokemon._id}>
                <div name={pokemon._id} >{pokemon.nickName}
                </div>
                <Link to={`/pokemon/${pokemon._id}`}><img className="ranchPics" name={pokemon._id} src={pokemon.front}>
                </img>
                </Link>
            </div>)
            }
        </div >)
    }

    export default Ranch;
