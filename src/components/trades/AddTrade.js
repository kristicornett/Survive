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
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
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
    <>
    <div className="trade-form w-full">
        <div className="w-full text-center flex justify-center ">
          <div className="w-4/5 flex">
            <div className="trade-add-left w-1/2 bg-white">
              <div className="w-full form-header mt-6 mb-12">Add Trade Offer</div>
              <form
                className="grid w-full"
                onSubmit={tradeSubmit}
              >
              <div className="w-full flex pl-16">

              <div className="w-1/2 text-left">
                <div className="form-cell">
                  <label className="form-label block">{"Item(s) Offered"}</label>
                  <input id='description' type="text" className="form-input text block" onChange={updateTrade}></input>
                </div>
                <div className="form-cell">
                <label className="form-label block">{"Offered Category"}</label>
                <select className="form-select" id='supplyTypeOfferId' required onChange={updateTrade}>
                    <option>Please select</option>
                    {supplyTypes.map((supplyType) => {
                      return (
                        <option key={supplyType.id} value={supplyType.id}>
                          {supplyType.type}
                        </option>
                      )
                    })}
                </select>
                </div>
                <div className="form-cell">
                  <label className="form-label block">Willing to Haggle?</label>
                  <input
                        id="haggle"
                        className="ml-3"
                        type="radio"
                        name="haggleRadio"
                        onChange={setHaggle}
                        value={true}
                        checked={trade.haggle == true}
                      ></input>
                      <label className="form-label ml-1" htmlFor="haggle">Yes</label>
                      <input
                        id="nohaggle"
                        className="ml-3"
                        type="radio"
                        name="haggleRadio"
                        onChange={setHaggle}
                        value={false}
                        checked={trade.haggle == false}
                      ></input>
                      <label className="form-label ml-1"  htmlFor="nohaggle">No</label>
                </div>
              </div>     
              <div className="w-1/2 text-left">
                <div className="form-cell">
                <label className="form-label block">{"Item(s) Wanted"}</label>
                  <input id='wanted' type="text" className="form-input text block" onChange={updateTrade}></input>
                </div>                
                <div className="form-cell">
                <label className="form-label block">{"Wanted Category"}</label>
                  <select className="form-select" id='supplyTypeOfferWantedId' required onChange={updateTrade}>
                    <option>Please select</option>
                    {supplyTypes.map((supplyType) => {
                      return (
                        <option key={supplyType.id} value={supplyType.id}>
                          {supplyType.type}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              </div>
              <div className="w-full text-right pr-16">
                <button className="button form-button small" type="submit"
                    onClick={(event) => tradeSubmit(event)}>Submit</button>
              </div>
              </form>
            </div>
            <div className="trade-add-right w-1/2">
            <img
            className="trade-add-pic"
            src={process.env.PUBLIC_URL + "/images/trade_add.png"} />
        
            </div>
          </div>
        </div>
      </div>
    </>
  )
}