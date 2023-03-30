import { useEffect, useState } from 'react'
import { getTowns, deleteTown } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import './Town.css'
import { Map } from '../nav/Map'

export const TownList = () => {
    const [towns, setTowns] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
           refreshTowns()
        },
        []
    )

    const deleteTowns = (event, townId) => {
        event.preventDefault()

        deleteTown(townId)
        .then((data) => refreshTowns())
    }

    const refreshTowns = () => {
            getTowns()
            .then((townArray) => {
                setTowns(townArray)
            })
    }
        return <>
        <h1 className='title-text text-5xl text-green-700 text-center mt-8'>Towns</h1>
        <button type="submit" className='town__button float-right rounded-full bg-slate-200 
        w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
        border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' onClick={() => navigate('/towns/add')}> Add A Town </button>
        <article className="town_List flex flex-row flex-wrap basis-1/4">
            {
                towns.map(
                    (town) => {
                        return <section className='p-4 w-1/3' key={`town--${town.id}`}>
                            
                            <div className='town bg-slate-100 rounded-md drop-shadow-md'>
                            <div className='font-bold align-text-center mb-4'>{town.name}
                            <span className='float-right rounded-full bg-slate-200 w-36 pt-1, pb- m-3 px-4 py-1 text-sm 
                            text-purple-600 font-semibold rounded-none w-24 justify-end text-center border 
                            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
                            block' onClick={() => navigate(`/towns/${town.id}/`)}>{town.vacancy ? 'Homes available.' : 'No vacancy.'}</span></div>
                                <div><img className='mt-10 p-2' src={town.image}/></div>
                            <span>{town.description} </span>
                            <div className='town-delete'><button className=' button float-right rounded-full bg-slate-200 w-3 pt-1, pb-1 -mt-8 pr-1
                            x-4 py-1 text-sm text-purple-600 font-semibold rounded-none w-3
                             justify-end text-justify border border-purple-200 hover:text-white hover:bg-purple-600 
                             hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 pr-3 pl-1
                             focus:ring-offset-2' id='delete_town' onClick={(event) => deleteTowns(event, town.id)}>X</button></div>
                            </div>
                            <div>
                                
                            </div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

