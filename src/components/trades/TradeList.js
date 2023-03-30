import { useEffect, useState } from 'react'
import { getTradeOffers, updateTradeOffers } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import { Trade } from './Trade'
import './Trades.css'


export const TradeList = ({disableAddButton}) => {
    const [trades, setTrades] = useState([])
    let [showAdd, setShowAdd] = useState(disableAddButton ? disableAddButton : false)
    const navigate = useNavigate()
    const localSurviveUser = localStorage.getItem("survive_user")
    const surviveUserObject = JSON.parse(localSurviveUser)

    useEffect(
        () => {
           refreshTrades()
        },
        []
    )

    const refreshTrades = () => {
        getTradeOffers()
        .then((tradeArray) => {
            setTrades(tradeArray)
        })

}

  return <>
        <h2 className='title-text text-5xl text-green-700 text-center mt-8'>Trade Offers</h2>

            {
                
                
                !showAdd ?
                
                <button type="submit" className='accept__button rounded-full bg-slate-200 w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 
                font-semibold rounded-full border border-purple-200 hover:text-white 
                hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 
                focus:ring-offset-2' onClick={() => navigate('/trades/add')}> Add A Trade </button>
                : ''
            
            }
        
        <article className="trade_List flex flex-row flex-wrap w-full basis-1/4">
            {
                trades.map(
                    (trade) => {
                        return <section key={`trade--${trade.id}`} className='Sighting flex flex-col items-center justify-center border-4 border-purple-800 p-4 m-6 w-80 bg-slate-100 opacity-80 drop-shadow-sm rounded-md'>
                          <Trade trade={trade} />
                         <div className='w-full'> <button type="submit" className='float-right rounded-full bg-slate-200 w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 
                            font-semibold rounded-full border border-purple-200 hover:text-white 
                            hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 
                            focus:ring-offset-2' onClick={() => navigate(`/trades/${trade.id}/`)}>See Details</button></div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

