import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleZombieSighting, deleteZombieSighting } from '../../repos/ApiManager'

export const ZombieSightingDetails = () => {
    const {zombieId} = useParams()
    const [zombieDetail, setZombieDetail] = useState(
        {
            town: '',
            zombieSightingType: '',
            zombieSightingDistance: 0,
            zombieSightingStatus: ''
          }
    )

    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleZombieSighting(zombieId)
            .then((data) => {
                const singleSighting = data
                setZombieDetail(singleSighting)
            })
            
           
        },
        [zombieId]
    )

const deleteSighting = (event, sightingId) => {
    event.preventDefault()

    deleteZombieSighting(zombieId)
    .then(() => navigate('/zombies'))
}


   

    return <section className='zombieDetail'>
        <div className='border-2 border-purple-800 p-4 m-4 w-1/3 bg-slate-100 opacity-80 drop-shadow-sm rounded-md font-bold'>
        <div >Posted by: <div className='font-normal'>{zombieDetail.name}</div></div>
        <div>Distance from {zombieDetail?.town?.name}: <div className='font-normal'>{zombieDetail?.zombieSightingDistance?.distance}</div></div>
        <div>Type of Sighting: <div className='font-normal'>{zombieDetail?.zombieSightingType?.type}</div></div>
        <div>Number of undead: <div className='font-normal'>{zombieDetail?.approxCount}</div> </div>
       <div>Status: <div className='font-normal'>{zombieDetail?.zombieSightingStatus?.status}</div></div>
       <div><button type="submit" className='button rounded-full bg-slate-200 w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-none w-px justify-end text-justify border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' id='delete_sighting' onClick={(event => deleteSighting(event, zombieDetail.id))}>X</button> <button type="submit" className='rounded-full bg-slate-200 w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' onClick={() => navigate(`/zombies/${zombieDetail.id}/status`)}>Update Status</button></div>
       </div>
    </section>
}
