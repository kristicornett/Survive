import { useEffect, useState } from 'react'
import { deleteZombieSighting, getTowns, getZombieSightings } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'

export const ZombieSightingScrollingList = () => {
    const [sightings, setSightings] = useState([])
    const [towns, setTowns] = useState([])

    useEffect(
        () => {
            getZombieSightings()
            .then((sightingArray) => {
                setSightings(sightingArray)
            })
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


    return <>
    <h2><a href='/zombies' className="font-sans scrolling-header text-green-800 text-2xl">Zombie Sightings</a></h2>
    <div className="scrolling-parent" >
    <article className="zombieSightings scrolling-box">
        {
            sightings.map(
                (sighting) => {
                    return <section key={`sighting--${sighting.id}`} className='scroll-item-box rounded-lg'>
                        <div>{sighting?.zombieSightingType?.type} of {sighting.approxCount} Zombies near {sighting?.town?.name}.</div>
                    </section>
                }
            )
        }
    </article>
    </div>
    </>
}

