import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createNewTrade, getSupplies, getTradeOffers, getSupplyTypes, getUser } from "../../repos/ApiManager";


export const AddTrade = (props) => {
  const [trade, setTrade] = useState({
    description: '',
    enteredUserId: 0,
    acceptedUserId: null,
    supplyTypeOfferId: 0,
    supplyTypeOfferWantedId: 0,
    townId: 0
  });
 
  const [user, setUser] = useState({})
  const [supplyTypes, setSupplyTypes] = useState([])
  const [supplies, setSupplies] = useState([])
  const [addTrades, setAllTrades] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTradeOffers().then((tradeArray) => {
      setAllTrades(tradeArray)
    })

    getSupplies().then((supplyArray) => {
        setSupplies(supplyArray)
    })

    getSupplyTypes().then((supplyTypeArray) => {
        setSupplyTypes(supplyTypeArray)
    })
   
  }, [])

  useEffect(() => {
    getUser(surviveUserObject.id).then((data) => {
        setUser(data)
    })
    },
    [surviveUserObject])


  const tradeSubmit = (event) => {
    event.preventDefault()

    const newTradeToSendToAPI = {
      description: trade.description,
      wanted: trade.wanted,
      enteredUserId: user.id,
      acceptedUser: null,
      supplyTypeOfferId: trade.supplyTypeOfferId,
      supplyTypeWantedId: trade.supplyTypeOfferWantedId,
      townId: user.townId
      
    }
    return createNewTrade(newTradeToSendToAPI).then(() => {
      navigate("/trades")
    })
  }


  const updateTrade = (event) => {
    const copy = { ...trade }
    if (isNaN(parseInt(event.target.value))) {
        copy[event.target.id] = event.target.value
    } else {
        copy[event.target.id] = parseInt(event.target.value)
    }   
    setTrade(copy)
  }

  const setHaggle = (event) => {
    const copy = {...trade}
    copy.haggle = (event.target.value == 'true')
    setTrade(copy)
  }

  const test = () => {
    return <div className=' m-2'>Trade at your own risk</div>
  }

  return (
    <main style={{ textAlign: 'center' }}>
      <div>
        <h1 className='text-4xl p-8 decoration-8 text-center text-green-600 text-shadow shadow-indigo-500 font-bold'>Add A Trade</h1>
     </div>
     <div className='grid h-screen place-items-center'>
     <div className='grid place-items-center w-1/2 px-10 py-14 -mt-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-purple-700'>
      <form className='bg-zinc-600 w-9/12 h-96 m-24  text-slate-100' onSubmit={updateTrade}>
        
        <fieldset className='pb-7 pt-5'>
            <div className='form-group'>
            <input className='text-black ring-offset-green-700'
            onChange={updateTrade}
            name='Desciption'
            type='text'
            id='description'
            placeholder='Description of Trade'
            required />
              <input
            onChange={updateTrade}
            name='Desciption'
            type='text'
            id='wanted'
            className='tradeDescription ml-5 text-black'
            placeholder='Looking For'
            required />
           </div>
           </fieldset> 
        

           <fieldset className='text-black'>
          <div className="form-group ">
            <select id='supplyTypeOfferId' required onChange={updateTrade}>
              <option>Choose Supply Type Trade</option>

              {supplyTypes.map((supplyType) => {
                return (
                  <option key={supplyType.id} value={supplyType.id}>
                    {supplyType.type}
                  </option>
                )
              })}
            </select>
              
            <select className="form-group m-4" id='supplyTypeOfferWantedId' required onChange={updateTrade}>
              <option>Choose Supply Type Receive</option>

              {supplyTypes.map((supplyType) => {
                return (
                  <option key={supplyType.id} value={supplyType.id}>
                    {supplyType.type}
                  </option>
                )
              })}
            </select>
          </div>
        </fieldset>
           
           <fieldset className='p-2 m-2'>
           <label>Willing to haggle?
            <input className='m-3' type='radio' name='haggle' onChange={setHaggle} value={true} checked={
                (
                    trade.haggle == true
                )
            }></input>
           </label>
           <label>No Haggling
            <input className='m-3' type='radio' name='townVacancy' onChange={setHaggle} value={false} checked={
                (
                    trade.haggle == false
                )
            }></input>
           </label>
           </fieldset>
        <fieldset>
            {
                test()
            }
          <button className="float-center rounded-full bg-slate-200 
        w-36 pt-1, pb-1 px-4 py-1 mt-5 text-sm text-purple-600 font-semibold rounded-full 
        border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" type="submit" onClick={(event) => tradeSubmit(event)}>
            {" "}
            Submit New Trade Offer{" "}
          </button>
        </fieldset>
      </form>
      </div>
      </div>
    </main>
  )
}
