import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  getTowns,
  getUsers,
  createZombieSighting,
  getDistances,
  getZombieSightingTypes
} from "../../repos/ApiManager";
import './Zombies.css'

export const ZombieSightingForm = (props) => {
  const [sighting, setSighting] = useState({
    closestTownId: 0,
    distanceId: 0,
    approxCount: 0,
    sightTypeId: 0,
  });
  const [towns, setTowns] = useState([])
  const [distances, setDistances] = useState([])
  const [users, setUsers] = useState([])
  const [sightingTypes, setSightingTypes] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTowns().then((townArray) => {
      setTowns(townArray)
    })
    getUsers().then((userArray) => {
      setUsers(userArray)
    })
    getDistances().then((distanceArray) => {
      setDistances(distanceArray)
    })
    getZombieSightingTypes().then((typeArray) => {
      setSightingTypes(typeArray)
    })
  }, [])


  const handleZombieSubmit = (event) => {
    event.preventDefault()

    const zombieSightingToSendToAPI = {
      name: surviveUserObject.name,
      townId: sighting.closestTownId,
      zombieSightingDistanceId: sighting.distanceId,
      zombieSightingTypeId: sighting.sightTypeId,
      approxCount: sighting.approxCount,
      enteredDate: new Date(Date.now()).toISOString(),
      zombieSightingStatusId: 1,
    }
    return createZombieSighting(zombieSightingToSendToAPI).then(() => {
      navigate("/zombies")
    })
  }

  const updateSighting = (event) => {
    const copy = { ...sighting }
    copy[event.target.id] = event.target.value
    setSighting(copy)
  }

  const updateTown = (event) => {
    const copy = { ...sighting }
    copy.closestTownId = parseInt(event.target.value)
    setSighting(copy)
  }

  const updateDistance = (event) => {
    const copy = { ...sighting }
    copy.distanceId = parseInt(event.target.value)
    setSighting(copy)
  }

  const updateSightingType = (event) => {
    const copy = {...sighting}
    copy.sightTypeId = parseInt(event.target.value)
    setSighting(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
       <div><h1 className='title-text text-6xl p-8 decoration-8 text-center text-green-600 text-shadow shadow-indigo-500 font-bold'>Report A Zombie</h1></div>

      <div className="grid h-screen place-items-center">
        <div className="grid place-items-center w-1/2 px-10 py-14 -mt-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-purple-700">
      <form className='survive__login bg-zinc-600 w-96'onSubmit={handleZombieSubmit}>
  
        <fieldset className='pb-7 pt-5'>
          <select required onChange={updateTown}>
            <option>Choose Town</option>

            {towns.map((town) => {
              return (
                <option key={town.id} value={town.id}>
                  {town.name}
                </option>
              )
            })}
          </select>
        </fieldset>
        <fieldset className='pb-7 pt-5'>
          <div className="form-group">
            <select required onChange={updateDistance}>
              <option>Choose Distance From Town</option>

              {distances.map((distance) => {
                return (
                  <option key={distance.id} value={distance.id}>
                    {distance.distance}
                  </option>
                )
              })}
            </select>
          </div>
        </fieldset>
        <fieldset className='pb-7 pt-5'>
          <input
            onChange={updateSighting}
            name="Number of Zombies"
            type="number"
            id="approxCount"
            className="numberOfZombies"
            placeholder="Number of Zombies"
            required
          />
        </fieldset>
        <fieldset className='pb-7 pt-5'>
            <div className="form-group">
              {sightingTypes.map((sightingType) => {
                return (
                    <label className='m-2'
                       key={sightingType.id}>
                     <input
                     onChange={updateSightingType}
                     checked={sightingType.id === sighting.sightTypeId}
                    type='radio'
                    name='SightingType'
                    value={sightingType.id} /> {sightingType.type}
                    </label>
                )
              })}
            </div>
        </fieldset>
        <fieldset className='pb-7 pt-5'>
          <button className='rounded-full bg-slate-200 w-36 m-3 px-4 pb-1 mb-3 text-sm text-purple-600 font-semibold rounded-full border border-green-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2' type="submit" onClick={(event) => handleZombieSubmit(event)}>
            {" "}
            Submit Zombie Sighting{" "}
          </button>
        </fieldset>
      </form>
      </div>
      </div>
    </main>
  )
}
