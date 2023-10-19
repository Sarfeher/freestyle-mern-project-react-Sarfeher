import { useEffect, useState } from "react"
import {Link} from "react-router-dom"

const getTrainers = async () => {
    const res = await fetch('/api/trainers/')
    return res.json()
}




function Trainer() {
    const [trainers, setTrainers] = useState(null)
    useEffect(() => {
        getTrainers().then((trainers) => {
            setTrainers(trainers)
        })
    }, [])

    return (<div>
        {trainers?.map((trainer) => {
            return <Link to={`/trainer/${trainer._id}`}key={trainer._id}>
            <div key={trainer._id} className="pokemon-data" >
                <h2> {trainer.name} </h2>
                <h2> {trainer.age} </h2>
            </div>
            </Link>
        })}
    </div>)
}

export default Trainer;