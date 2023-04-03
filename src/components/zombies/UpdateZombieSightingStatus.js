import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleZombieSighting,
  getZombieSightingStatuses,
  updateZombieSightingStatus,
  createStatusLog
 
} from "../../repos/ApiManager";
import "./Zombies.css"

export const UpdateZombieSightingForm = (props) => {
  const [sighting, setSighting] = useState({
    closestTownId: 0,
    distanceId: 0,
    approxCount: 0,
    sightTypeId: 0,
  });
  const {sightingId} = useParams()
  const [statuses, setStatuses] = useState([])
  const [newStatus, setNewStatus] = useState(0)
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
   
    getSingleZombieSighting(sightingId)
    .then((data) => {
        setSighting(data)
    })
    
  }, [sightingId])

  useEffect(() => {
    getZombieSightingStatuses()
    .then((data) => {
        setStatuses(data)
    })
  },
  []
  )

  const updateNewStatus = (event) => {
    const statusId = parseInt(event.target.value)
    setNewStatus(statusId)
  }


  const handleUpdateStatusSubmit = (event) => {
    event.preventDefault()

    const oldStatusId = sighting.zombieSightingStatusId

    return updateZombieSightingStatus(sightingId, newStatus).then(() => {
      navigate("/zombies")
    }).then(() => {
        const newStatusLogToSendToAPI = {
            
            zombieSightingId: sightingId,
            enteredUserId: surviveUserObject.id,
            enteredDate: new Date(Date.now()).toISOString(),
            previousStatusId: oldStatusId,
            newStatusId: newStatus
        }
        createStatusLog(newStatusLogToSendToAPI)
       
    })
  }

 return (
   <>
     <div className="zombie-form w-full">
       <div className="w-full text-center flex justify-center">
         <div className="w-4/5 flex">
           <div className="zombie-add-left w-1/2 bg-white ">
             <div className="w-full form-header">Update Sighting Status</div>
             <form className="grid w-full" onSubmit={handleUpdateStatusSubmit}>
               <div className="w-full flex pl-16">
                 <div className="w-1/2 text-left">
                   <div className="form-cell">
                     <label className="form-label block">Nearest Town</label>
                     <span>{sighting?.town?.name}</span>
                   </div>
                   <div className="form-cell">
                     <label className="form-label block">
                       Distance From Town
                     </label>
                     <span>{sighting?.zombieSightingDistance?.distance}</span>
                   </div>
                   <div className="form-cell">
                     <label className="form-label block">Number Seen</label>
                     <span>{sighting.approxCount}</span>
                   </div>
                   <div className="form-cell">
                     <label className="form-label block">Sighting Type</label>
                     <span>{sighting?.zombieSightingType?.type}</span>
                   </div>
                   <div className="form-cell">
                     <label className="form-label block">Current Status</label>
                     <span>{sighting?.zombieSightingStatus?.status}</span>
                   </div>
                   <div className="form-cell">
                     <label className="form-label block">Update Status</label>
                     <select className="form-select" onChange={updateNewStatus}>
                       <option>Choose Status</option>
                       {statuses.map((status) => {
                         return (
                           <option key={status.id} value={status.id}>
                             {status.status}
                           </option>
                         );
                       })}
                     </select>
                   </div>
                 </div>
               </div>
               <div className="w-full text-right pr-16">
                 <button
                   className="button form-button small"
                   type="submit"
                   onClick={(event) => handleUpdateStatusSubmit(event)}
                 >
                   Submit
                 </button>
               </div>
             </form>
           </div>
           <div className="zombie-add-right w-1/2">
             <img
               className="zombie-add-pic"
               src={process.env.PUBLIC_URL + "/images/zombie_add.png"}
             />
           </div>
         </div>
       </div>
     </div>
   </>
 );

  // return (
  //   <main style={{ textAlign: "center" }}>
  //     <form className="zombieSighting" onSubmit={handleUpdateStatusSubmit}>
  //       <h1 className="h3 mb-3 font-weight-normal">Report a Zombie Sighting</h1>
  //       <fieldset>
  //       <article className="town_List"> Town:
  //           {
  //              sighting?.town?.name
  //           }
  //       </article>
  //       </fieldset>
  //       <fieldset>
  //         <div className="form-group">
  //         <article className="distance"> Distance From Town:
  //           {
  //              sighting?.zombieSightingDistance?.distance
  //           }
  //       </article>
  //         </div>
  //       </fieldset>
  //       <fieldset>
  //         Number of Zombies:  
  //         {
  //           sighting.approxCount
  //         }
  //       </fieldset>
  //       <fieldset>
  //          Sighting Type: 
  //          {
  //           sighting?.zombieSightingType?.type
  //          }
  //       </fieldset>
  //       <fieldset>
  //          Current Status: 
  //          {
  //           sighting?.zombieSightingStatus?.status
  //          }
  //       </fieldset>
  //       <fieldset>
  //           New Status: 
  //           <select onChange={updateNewStatus}>
  //           <option>Choose Status</option>

  //               {statuses.map((status) => {
  //               return (
  //                   <option key={status.id} value={status.id}>
  //                   {status.status}
  //                   </option>
  //               )
  //               })}
  //           </select>
  //       </fieldset>
  //       <fieldset>
  //         <button type="submit" onClick={(event) => handleUpdateStatusSubmit(event).then(() => navigate(`/zombies/${sighting.id}`))}>
  //           {" "}
  //           Update Zombie Sighting{" "}
  //         </button>
  //       </fieldset>
  //     </form>
  //   </main>
  // )
}
