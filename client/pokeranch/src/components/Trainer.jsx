import { useEffect, useState } from "react"

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
            return <div key={trainer._id} className="pokemon-data" >
                <h2> {trainer.name} </h2>
                <h2> {trainer.age} </h2>
            </div>
        })}
    </div>)
}

export default Trainer