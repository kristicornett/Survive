import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSupplies, getSupplyTypes, getTrade, getTradeOffers, getUsers, updateTradeOffers, deleteTrade } from '../../repos/ApiManager'
import "./TradeDetails.css"

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
   
   return <>
    <div className='w-full flex justify-center mt-32'>
        <section className="card mt-8 w-2/5">
            <div className='card-header flex'>
                <div className="flex-none w-12">
                    <img className="card-icon" src={process.env.PUBLIC_URL + "/images/trade_icon.png"}></img>
            </div>
            <div className="flex-1"></div>
            <div className="flex-none w-12 text-center"><button type="button" className='form-button small' onClick={(event) => clickDeleteTrade(event, tradeDetail.id) }>X</button></div>
            </div>
            <div className='card-body flex justify-evenly'>
                <div className="flex-1 flex flex-col">
                    <div className="trade-cell">
                        <label>Supply Offered</label>
                        <span class="trade-data">{tradeDetail.description}</span>
                    </div>
                    <div className="trade-cell">
                    <label>Category</label>
                        <span class="trade-data">{tradeDetail?.supplyTypeOffered?.type}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Located At</label>
                        <span class="trade-data">{tradeDetail?.town?.name}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Offered By</label>
                        <span class="trade-data">{tradeDetail?.enteredUser?.name}</span>  
                    </div>
                </div>
                <div className='flex-1 flex flex-col '>
                <div className="trade-cell">
                        <label>Supply Wanted</label>
                        <span class="trade-data">{tradeDetail.wanted}</span>
                    </div>
                    <div className="trade-cell">
                    <label>Category</label>
                        <span class="trade-data">{tradeDetail?.supplyTypeWanted?.type}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Accepted By</label>
                        <span class="trade-data">{tradeDetail?.acceptedUser?.name ? tradeDetail?.acceptedUser?.name : '--'}</span>  
                    </div>
                    <div className="trade-cell"> 
                    {!tradeDetail.acceptedUser &&
                        <button className="form-button small" onClick={(event) => clickAcceptButton(event, trade)}>Accept Trade</button>
                    }
                    </div>
                </div>
            </div>
        </section>
        </div>
   </>
}