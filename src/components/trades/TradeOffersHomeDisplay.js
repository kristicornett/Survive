import { useEffect, useState } from 'react'
import { getTradeOffers } from '../../repos/ApiManager'



export const TradeOffersHomeDisplay = () => {
    const [trades, setTrades] = useState([])
  

    useEffect(
        () => {
           refreshTrades()
        },
        []
    )

    const deleteTrade = (event, tradeId) => {
        event.preventDefault()

        deleteTrade(tradeId)
        .then((data) => refreshTrades())
    }

    const refreshTrades = () => {
            getTradeOffers()
            .then((tradeArray) => {
                setTrades(tradeArray)
            })
    }
        return <>
        <h2><a href='http://localhost:3000/trades' className="font-sans scrolling-header text-green-800 text-2xl">Trade Offers</a></h2>
        <div className="scrolling-parent" >
        <article className="tradeOffers_List scrolling-box">
            {
                trades.map(
                    (trade) => {
                        return <section key={`trade--${trade.id}`} className='scroll-item-box rounded-lg'>
                            <div className='trade'>{trade.description} for {trade.wanted}</div>
                        </section>
                    }
                )
            }
        </article>
        </div>
        </>
}

