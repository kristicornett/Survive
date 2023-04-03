import { useEffect, useState } from 'react'
import { getTradeOffers, updateTradeOffers } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import { Trade } from './Trade'
import './Trades.css'
import '../views/UserViews.css'


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
       <div className="home-bar trades text-right flex">
            <span className="trade-text"> Trade Offers </span>
        </div>

            {
                
                
                !showAdd ?
                
                <button type="submit" className='float-right bg-slate-200 
                w-36 pt-1, pb-1 m-3 px-4 py-1 mt-2 text-sm text-purple-600 font-semibold
                border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' onClick={() => navigate('/trades/add')}> Add A Trade </button>
                : ''
            
            }
        
        <article className="trade_List flex flex-row flex-wrap w-full basis-1/4">
            {
                trades.map(
                    (trade) => {
                        return <section key={`trade--${trade.id}`} 
                        className='p-4 w-1/4'>
                         <div className='card bg-slate-100 rounded-md drop-shadow-md flex flex-col items-center'>
                         <div className='card-header'>
                            <img className="card-icon" src={process.env.PUBLIC_URL + "/images/trade_icon.png"}></img>
                        </div>
                        <div className='card-body'>
                        <Trade trade={trade} />
                         <div className='my-2'> 
                         <button type="submit" className='button bg-slate-200 w-36 pt-1 px-4 py-1 text-sm 
                                        text-purple-600 font-semibold rounded-none text-center border 
                                        border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                                        focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
                                        inline' onClick={() => navigate(`/trades/${trade.id}/`)}>See Details</button></div>
                        </div>
                        </div>
                        </section>
                    }
                )
            }
        </article>
        </>
}
