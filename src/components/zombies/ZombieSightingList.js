import { useEffect, useState } from 'react'
import { deleteZombieSighting, getTowns, getZombieSightings } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import './Zombies.css'
import '../views/UserViews.css'

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
    
    const renderSightingIcons = (sighting) => {
        if(sighting.zombieSightingTypeId == 1){
        return (
            <img className="card-icon" src={process.env.PUBLIC_URL + "/images/zombie_icon.png"}></img>
        )
        }                            
        else{
            return (
                <img className="card-icon wide" src={process.env.PUBLIC_URL + "/images/zombie_cluster_icon.png"}></img>
            )
        }
                                        
    }

        return <>
         <div className="home-bar zombie text-right">
          <span className="zombie-text">Zombie Sightings </span>
        </div>
        {
    
            !showAdd ?
            
            <button type="submit" className='zombie__button float-right bg-slate-200 mr-16 pt-1, pb-1 px-4 py-1 text-sm text-purple-600 
            font-semibold border border-purple-200 hover:text-white mt-8 font-bold
            hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 
            focus:ring-offset-2' onClick={() => navigate('/zombies/add')}> Report a Zombie </button>
            : ''
           
        }
        <article className="zombieSightings flex flex-row flex-wrap basis-1/3 mt-12 justify-center">
           
            {
                sightings.map(
                    (sighting) => {
                        
                        return <section key={`sighting--${sighting.id}`}
                            className='p-4 w-1/2'>
                            <div className='card bg-slate-100 rounded-md drop-shadow-md flex flex-col items-center'>
                                <div className='card-header'>
                                     { renderSightingIcons(sighting)}
                                </div>
                                <div className='card-body'>Town of {sighting?.town?.name} has {sighting.approxCount} zombie{sighting.approxCount != 1 ? 's' : ''} nearby.

                                        <img className='mt-10 p-2 mb-5' src={process.env.PUBLIC_URL + "/images/" + sighting?.zombieSightingType?.image} />
                                    

                                    <button type="submit" className='button bg-slate-200 w-36 pt-1 px-4 py-1 text-sm
                                     text-purple-600 font-semibold rounded-none text-center border
                                     border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                                     focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2  inline mb-4
                                    ' 
                                    onClick={() => navigate(`/zombies/${sighting.id}/`)}>See Details</button>
                                </div>
                            </div>
                        </section>
                    }
                )
            }
        </article>
        </>
}


// <section key={`trade--${trade.id}`} 
//                         className='p-4 w-1/4'>
//                          <div className='card bg-slate-100 rounded-md drop-shadow-md flex flex-col items-center'>
//                          <div className='card-header'>
//                             <img className="card-icon" src={process.env.PUBLIC_URL + "/images/trade_icon.png"}></img>
//                         </div>
//                         <div className='card-body'>
//                         <Trade trade={trade} />
//                          <div className='my-2'> 
//                          <button type="submit" className='button bg-slate-200 w-36 pt-1 px-4 py-1 text-sm 
//                                         text-purple-600 font-semibold rounded-none text-center border 
//                                         border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
//                                         focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
//                                         inline' onClick={() => navigate(`/trades/${trade.id}/`)}>See Details</button></div>
//                         </div>
//                         </div>
//                         </section>
