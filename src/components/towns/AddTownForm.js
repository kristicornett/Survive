import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewTown, getTowns } from "../../repos/ApiManager";
import "./Town.css";

export const AddTown = (props) => {
  const [town, setTown] = useState({
    name: "",
    description: "",
    population: 0,
    vacancy: false,
    latitude: 0,
    longitude: 0,
  });

  let navigate = useNavigate();

  useEffect(() => {
  }, []);

  const townSubmit = (event) => {
    event.preventDefault();

    const newTownToSendToAPI = {
      name: town.name,
      description: town.description,
      population: town.population,
      vacancy: town.vacancy,
      latitude: town.latitude,
      longitude: town.longitude,
      image: town.image,
      mapKey: town.mapKey,
    };
    return createNewTown(newTownToSendToAPI).then(() => {
      navigate("/towns");
    });
  };

  const updateTown = (event) => {
    const copy = { ...town };
    if (isNaN(parseInt(event.target.value))) {
      copy[event.target.id] = event.target.value;
    } else {
      copy[event.target.id] = parseInt(event.target.value);
    }
    setTown(copy);
  };

  const setVacancy = (event) => {
    const copy = { ...town };
    copy.vacancy = event.target.value == "true";
    setTown(copy);
  };

  return (
    <>
      <div className="town-form w-full">
        <div className="w-full text-center flex justify-center">
          <div className="w-4/5 flex">
            <div className="town-add-left w-1/2 bg-white ">
              <div className="w-full form-header mt-8 mb-6">Add a Town</div>
              <form
                className="grid w-full"
                onSubmit={updateTown}
              >
              <div className="w-full flex pl-16">

              <div className="w-1/2 text-left">
                <div className="form-cell">
                  <label className="form-label block">Town Name</label>
                  <input id='name' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>
                <div className="form-cell">
                  <label className="form-label block">Map Key</label>
                  <input id='mapKey' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>
                <div className="form-cell">
                  <label className="form-label block">Latitude</label>
                  <input id='latitude' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>
                <div className="form-cell">
                  <label className="form-label block">Vacancy</label>
                  <input
                        id="vac"
                        className="ml-3"
                        type="radio"
                        name="townVacancy"
                        onChange={setVacancy}
                        value={true}
                        checked={town.vacancy == true}
                      ></input>
                      <label className="form-label ml-1" htmlFor="vac">Yes</label>
                      <input
                        id="novac"
                        className="ml-3"
                        type="radio"
                        name="townVacancy"
                        onChange={setVacancy}
                        value={false}
                        checked={town.vacancy == false}
                      ></input>
                      <label className="form-label ml-1"  htmlFor="novac">No</label>
                </div>
              </div>     
              <div className="w-1/2 text-left">
                <div className="form-cell">
                  <label className="form-label block">Population</label>
                  <input id='population' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>                
                <div className="form-cell">
                  <label className="form-label block">Image URL</label>
                  <input id='image' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>
                <div className="form-cell">
                  <label className="form-label block">Longitude</label>
                  <input id='longitude' type="text" className="form-input text block" onChange={updateTown}></input>
                </div>
              </div>
              </div>
              <div className="w-full px-16">
              <div className="form-cell text-left">
                  <label className="form-label block">Description</label>
                  <textarea id="description" className="form-input textarea w-full" rows="3" onChange={updateTown}>
              </textarea>
              </div>
              </div>
              <div className="w-full text-right pr-16">
                <button className="button form-button small" type="submit"
                    onClick={(event) => townSubmit(event)}>Submit</button>
              </div>
              </form>
            </div>
            <div className="town-add-right w-1/2">
            <img
            className="town-add-pic"
            src={process.env.PUBLIC_URL + "/images/town_add.png"} />
        
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};
