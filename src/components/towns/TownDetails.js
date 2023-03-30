import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleTown} from '../../repos/ApiManager'
import { Map } from '../nav/Map'

export const TownDetails = () => {
    const {townId} = useParams()
    const [townDetail, setTownDetail] = useState(
        {
            town: '',
            population: 0,
            vacancy: false,
            mapKey: ''
          }
    )

    const [showDirectionsMap, setShowDirectionsMap] = useState(false);
    const [targetDestination, setTargetDestination] = useState();

    const navigate = useNavigate()

    useEffect(
        () => {
            getSingleTown(townId)
            .then((data) => {
                const singleTown = data
                setTownDetail(singleTown)
            })
            
           
        },
        [townId]
    )


    const clickShowDirections = (event) => {
        setShowDirectionsMap(true)
    }

    const updateDestination = (event) => {
        setTargetDestination(event.target.value);
    }

    const clearDestination = (event) => {
        setTargetDestination('')
        setShowDirectionsMap(false)
    }
   

    return <> <div className="flex">
        <section className='townDetail flex-1/2 space-x-8'>
            <div className='border-2 border-purple-800 p-4 m-4 w-full bg-slate-100 opacity-80 drop-shadow-sm rounded-md font-bold'>
            <div className='text-xl mb-2'>{townDetail.name}</div>
            <div>Population: {townDetail.population}</div>
            <div className='inline'>Vacancy: <div className='font-normal inline'>{townDetail.vacancy ? 'true' : 'false'}</div></div>
            <div>Map: </div>
            <Map origin={townDetail.mapKey} width="450" height="320" mode='place'></Map>
        </div>
        </section>
        <section className="townDetail flex-1/2">
            <div className='border-2 border-purple-800 p-4 m-4 w-full bg-slate-100 opacity-80 drop-shadow-sm rounded-md font-bold'>
                <form id="directionsForm" onSubmit={clickShowDirections}>
                    <input type="text" id="origin" placeholder='Enter your address' onChange={updateDestination}></input>
                    <button className="button border border-purple" type='button' onClick={clickShowDirections}>Get Directions</button>
                    <button className="button border border-purple" type='button' onClick={clearDestination}>Clear</button>
                </form>
                {showDirectionsMap && 
                    <Map origin={townDetail.mapKey} destination={targetDestination} width="450" height="320" mode='directions'></Map>
                }
            </div>
        </section> 
    </div>
    </>
}