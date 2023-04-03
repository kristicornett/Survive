import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getTowns,
  getUsers,
  createZombieSighting,
  getDistances,
  getZombieSightingTypes,
} from "../../repos/ApiManager"
import "./Zombies.css"

export const ZombieSightingForm = (props) => {
  const [sighting, setSighting] = useState({
    closestTownId: 0,
    distanceId: 0,
    approxCount: 0,
    sightTypeId: 0,
  })
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
    });
    getUsers().then((userArray) => {
      setUsers(userArray)
    });
    getDistances().then((distanceArray) => {
      setDistances(distanceArray)
    });
    getZombieSightingTypes().then((typeArray) => {
      setSightingTypes(typeArray)
    });
  }, []);

  const handleZombieSubmit = (event) => {
    event.preventDefault();

    const zombieSightingToSendToAPI = {
      name: surviveUserObject.name,
      townId: sighting.closestTownId,
      zombieSightingDistanceId: sighting.distanceId,
      zombieSightingTypeId: sighting.sightTypeId,
      approxCount: sighting.approxCount,
      enteredDate: new Date(Date.now()).toISOString(),
      zombieSightingStatusId: 1,
    };
    return createZombieSighting(zombieSightingToSendToAPI).then(() => {
      navigate("/zombies")
    });
  };

  const updateSighting = (event) => {
    const copy = { ...sighting }
    copy[event.target.id] = event.target.value
    setSighting(copy)
  };

  const updateTown = (event) => {
    const copy = { ...sighting }
    copy.closestTownId = parseInt(event.target.value)
    setSighting(copy)
  };

  const updateDistance = (event) => {
    const copy = { ...sighting }
    copy.distanceId = parseInt(event.target.value)
    setSighting(copy)
  };

  const updateSightingType = (event) => {
    const copy = { ...sighting }
    copy.sightTypeId = parseInt(event.target.value)
    setSighting(copy)
  };

  return (
    <>
      <div className="zombie-form w-full">
        <div className="w-full text-center flex justify-center">
          <div className="w-4/5 flex">
            <div className="zombie-add-left w-1/2 bg-white ">
              <div className="w-full form-header mt-4 mb-12">Report Sighting</div>
              <form className="grid w-full" onSubmit={handleZombieSubmit}>
                <div className="w-full flex pl-16">
                  <div className="w-full text-left">
                    <div className="form-cell">
                      <label className="form-label block">Nearest Town?</label>
                      <select className="form-select" required onChange={updateTown}>
                          <option>Please select...</option>
                          {towns.map((town) => {
                            return (
                              <option key={town.id} value={town.id}>
                                {town.name}
                              </option>
                            )
                          })}
                        </select>
                    </div>
                    <div className="form-cell">
                    <label className="form-label block">Distance From Town?</label>
                    <select className="form-select" required onChange={updateDistance}>
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
                    <div className="form-cell">
                    <label className="form-label block">How Many Zombies?</label>
                    <input

                        onChange={updateSighting}
                        name="Number of Zombies"
                        type="number"
                        id="approxCount"
                        className="form-input text"
                        placeholder="Enter Number"
                        required
                      />
                    </div>
                    <div className="form-cell">
                      <label className="form-label block">Sighting Type</label>
                      {sightingTypes.map((sightingType) => {
                        return (
                          <label
                            htmlFor={"radio-" + sightingType.id}
                            className="form-label m-2"
                            key={sightingType.id}
                          >
                            <input
                              id={"radio-" + sightingType.id}
                              onChange={updateSightingType}
                              checked={sightingType.id === sighting.sightTypeId}
                              type="radio"
                              name="SightingType"
                              value={sightingType.id}
                            />{" "}
                            {sightingType.type}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-full text-right pr-16">
                  <button
                    className="button form-button small mt-8"
                    type="submit"
                    onClick={(event) => handleZombieSubmit(event)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="zombie-add-right w-1/2 overflow-hidden">
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
};



