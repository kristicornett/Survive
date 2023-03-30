import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplies, getSupplyTypes, getTrade, getTradeOffers, getUsers, updateTradeOffers, deleteTrade } from '../../repos/ApiManager'

export const TradeDetails = () => {
    const {tradeId} = useParams()
    const [tradeDetail, setTradeDetail] = useState(
        {
            description: '',
            wanted: '',
            enteredUserId: 0,
            acceptedUser: null,
            supplyTypeOfferId: 0,
            supplyTypeWantedId: 0,
            townId: 0
          }
    )
    const [trade, setTrade] = useState()
    const [users, setUsers] = useState([])
    const [supplyTypes, setSupplyTypes] = useState([])
    const localSurviveUser = localStorage.getItem("survive_user")
    const surviveUserObject = JSON.parse(localSurviveUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            getUsers()
            .then((userArray) => {
                setUsers(userArray)
            })
            getTrade(tradeId)
            .then((data) => {
                setTrade(data)
            })
            getSupplyTypes()
            .then((supplyTypeArray) => {
                setSupplyTypes(supplyTypeArray)
            })

        },
        []
    )

    useEffect(() => {
                const copy = {...trade}
                //find the matching suppy offered
                copy.supplyTypeOffered = supplyTypes.find((supplyType) => {
                return    supplyType.id == copy.supplyTypeOfferId
                })
    
                copy.supplyTypeWanted = supplyTypes.find((supplyType) => {
                  return  supplyType.id == copy.supplyTypeWantedId
                })
                
                copy.enteredUser = users.find((user) => {
                    return user.id == copy.enteredUserId
                })

                copy.acceptedUser = users.find((user) => {
                    return user.id == copy.acceptedUserId
                })

                setTradeDetail(copy)
            
        }, [trade, supplyTypes, users])

    const [feedback, setFeedback] = useState('')

    useEffect(
        () => {
            if (feedback!== ''){
            setTimeout(() => setFeedback(''), 3000)
        }
    },
    [feedback]
    )

    const clickAcceptButton = (event, trade) => {
        event.preventDefault()
        const copy = {...trade}
        copy.acceptedUserId = surviveUserObject.id
        updateTradeOffers(copy)
        .then(() => navigate('/trades'))
    }

    const buttonDisplay = (trade) => {
        if (trade.enteredUserId != surviveUserObject.id) {
           return <button onClick={(event) => clickAcceptButton(event, trade)}>Accept Trade</button>
        }
        return ''
}


const clickDeleteTrade = (event, tradeId) => {
    event.preventDefault()

    deleteTrade(tradeId)
    .then(() => navigate('/trades'))
}
   
   

    return <section className='tradeDetails'>
        <div className='border-2 border-purple-800 p-10 m-4 w-1/3 bg-slate-100 opacity-80 drop-shadow-sm rounded-md font-bold'>
        <div>Offering User: <div className='font-normal'>{tradeDetail?.enteredUser?.name}</div></div>
        <div>Supply Offered: <div className='font-normal'>{tradeDetail?.description} </div>Category: <div className='font-normal'>{tradeDetail?.supplyTypeOffered?.type}</div></div>
        <div>Supply Wanted: <div className='font-normal'>{tradeDetail?.wanted}</div> Category: <div className='font-normal'>{tradeDetail?.supplyTypeWanted?.type}</div></div>
        {buttonDisplay(tradeDetail)}<button className=' button float-right rounded-full bg-slate-200 w-28 pt-1, pb-1  
                            x-4 py-1 text-sm text-purple-600 font-semibold rounded-none w-3
                             justify-end text-justify border border-purple-200 hover:text-white hover:bg-purple-600 
                             hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 pr-3 pl-1 mb-8
                             focus:ring-offset-2' id='delete_trade' onClick={(event) => clickDeleteTrade(event, tradeDetail.id)}>Accept</button>
        </div>
    </section>
}