import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleZombieSighting, deleteZombieSighting, getZombieSightings} from '../../repos/ApiManager'

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

    

const deleteSighting = (event) => {
    event.preventDefault()

    deleteZombieSighting(zombieId)
    .then(() => navigate('/zombies'))
}

const renderSightingIcons = () => {
    if(zombieDetail.zombieSightingTypeId == 1){
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


   

    return <div className='w-full flex justify-center mt-32'>
    <section className='card mt-8 w-96'>
        <div className='card-header flex'>
            <div className='flex-none'>
               { renderSightingIcons() }
            </div>

            <div className="flex-1"></div>

            <div className="flex-none w-12 text-center"><button type="button" className='form-button small'  onClick={deleteSighting}>X</button></div>
            </div>
            <div>
            <div className='card-body flex justify-evenly'>
                <div className="flex-1 flex flex-col">
                    <div className="trade-cell">
                        <label>Posted By:</label>
                        <span class="trade-data">{zombieDetail.name}</span>
                    </div>
                    <div className="trade-cell">
                    <label>Distance From:</label>
                        <span class="trade-data">{zombieDetail?.town?.name}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Type of Sighting:</label>
                        <span class="trade-data">{zombieDetail?.zombieSightingType?.type}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Number of Undead:</label>
                        <span class="trade-data">{zombieDetail?.approxCount}</span>  
                    </div>
                    <div className="trade-cell">
                    <label>Status:</label>
                        <span class="trade-data">{zombieDetail?.zombieSightingStatus?.status}</span>  
                    </div>
                    <div className="trade-cell"> 
                      <button className="form-button small"  onClick={() => navigate(`/zombies/${zombieDetail.id}/status`)}>Update Status</button>
                    </div>
                </div>
               
               
                   
                    
                   
                    
                      
                    
                    
                
            </div>
            </div>
            
        </section>
        </div>
   
}
            
     

{/* <>
        <section className="card mt-8">
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
   </> */}