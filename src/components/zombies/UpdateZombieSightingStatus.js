import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleZombieSighting,
  getZombieSightingStatuses,
  updateZombieSightingStatus,
  createStatusLog
 
} from "../../repos/ApiManager";

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
    <main style={{ textAlign: "center" }}>
      <form className="zombieSighting" onSubmit={handleUpdateStatusSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Report a Zombie Sighting</h1>
        <fieldset>
        <article className="town_List"> Town:
            {
               sighting?.town?.name
            }
        </article>
        </fieldset>
        <fieldset>
          <div className="form-group">
          <article className="distance"> Distance From Town:
            {
               sighting?.zombieSightingDistance?.distance
            }
        </article>
          </div>
        </fieldset>
        <fieldset>
          Number of Zombies:  
          {
            sighting.approxCount
          }
        </fieldset>
        <fieldset>
           Sighting Type: 
           {
            sighting?.zombieSightingType?.type
           }
        </fieldset>
        <fieldset>
           Current Status: 
           {
            sighting?.zombieSightingStatus?.status
           }
        </fieldset>
        <fieldset>
            New Status: 
            <select onChange={updateNewStatus}>
            <option>Choose Status</option>

                {statuses.map((status) => {
                return (
                    <option key={status.id} value={status.id}>
                    {status.status}
                    </option>
                )
                })}
            </select>
        </fieldset>
        <fieldset>
          <button type="submit" onClick={(event) => handleUpdateStatusSubmit(event).then(() => navigate(`/zombies/${sighting.id}`))}>
            {" "}
            Update Zombie Sighting{" "}
          </button>
        </fieldset>
      </form>
    </main>
  )
}
