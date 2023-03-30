import { useEffect, useState } from 'react'
import { deleteZombieSighting, getTowns, getZombieSightings } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import './Zombies.css'

export const ZombieSightingList = ({disableAddButton}) => {
    const [sightings, setSightings] = useState([])
    const [showAdd, setShowAdd] = useState(disableAddButton ? disableAddButton : false)
    const [towns, setTowns] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            refreshZombieSightings()
        },
        [towns]
    )

    useEffect(
        () => {
            getTowns()
            .then((townArray) => {
                setTowns(townArray)
            })
        },
        []
    )

    const deleteSighting = (event, sightingId) => {
        event.preventDefault()

        deleteZombieSighting(sightingId)
        .then((data) => refreshZombieSightings())
    }

    const refreshZombieSightings = () => {
            getZombieSightings()
            .then((sightingArray) => {
                setSightings(sightingArray)
            })
    }

        return <>
        <h2 className='title-text text-5xl text-center mt-8'>Zombie Sightings</h2>
        {
    
            !showAdd ?
            
            <button type="submit" className='zombie__button rounded-full float-right bg-slate-200 w-36 mr-16 pt-1, pb-1 px-4 py-1 text-sm text-purple-600 
            font-semibold rounded-full border border-purple-200 hover:text-white 
            hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 
            focus:ring-offset-2' onClick={() => navigate('/zombies/add')}> Report a Zombie </button>
            : ''
           
        }
        <article className="zombieSightings flex flex-row flex-wrap basis-1/3 mt-12 justify-center">
           
            {
                sightings.map(
                    (sighting) => {
                        return <section key={`sighting--${sighting.id}`} className='Sighting border-2 border-purple-800 ml-24 p-4 m-8 w-1/3 bg-slate-100 opacity-80 drop-shadow-sm rounded-md'>
                            <div className=''>Town of {sighting?.town?.name} has {sighting.approxCount} zombies near by.
                            <div><img className='mt-10 p-2' src={process.env.PUBLIC_URL + "/images/" + sighting?.zombieSightingType?.image}/></div>
                            <button type="submit" className='rounded-full bg-slate-200 w-36 pt-1, pb-1 px-4 py-1 text-sm text-purple-600 
                            font-semibold rounded-full border border-purple-200 hover:text-white 
                            hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 
                            focus:ring-offset-2 float-right' onClick={() => navigate(`/zombies/${sighting.id}/`)}>See Details</button></div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

