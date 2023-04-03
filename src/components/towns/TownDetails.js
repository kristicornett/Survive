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
        <div className="card">
            <div className="card-body">
            <div className='text-xl mb-2'>{townDetail.name}</div>
            <div><span>{ townDetail.vacancy ? 'Homes Available!' : 'No Vacancies'}</span></div>
            <div>Population: {townDetail.population}</div>
            <div>Map: </div>
            <Map origin={townDetail.mapKey} width="450" height="320" mode='place'></Map>

            </div>
        </div>
        <div className="card">
            <div className='card-body'>
            <div className='font-bold text-center'>
                <form className="map-search-form" onSubmit={clickShowDirections}>
                    <input className='form-input text mr-4' type="text" id="origin" placeholder='Enter your address' onChange={updateDestination}></input>
                    <button className="button form-button small" type='button' onClick={clickShowDirections}>Get Directions</button>
                    <button className="button form-button small " type='button' onClick={clearDestination}>Clear</button>
                </form>
                {showDirectionsMap && 
                    <Map origin={targetDestination} destination={townDetail.mapKey} width="450" height="320" mode='directions'></Map>
                }
            </div>
            </div>
        </div>

    </div>
    </>
}