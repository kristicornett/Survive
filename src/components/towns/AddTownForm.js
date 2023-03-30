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

  const [allTowns, setAllTowns] = useState([]);
  const localSurviveUser = localStorage.getItem("survive_user");
  const surviveUserObject = JSON.parse(localSurviveUser);

  let navigate = useNavigate();

  useEffect(() => {
    getTowns().then((townArray) => {
      setAllTowns(townArray);
    });
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
    <main style={{ textAlign: "center" }}>
      <div>
        <h1 className="title-text text-6xl p-8 decoration-8 text-center text-green-600 text-shadow shadow-indigo-500 font-bold">
          Add A Town
        </h1>
      </div>
      <div className="w-full h-screen flex login-main">
        <div className="w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-purple-700">
          <div className="addTown-form flex flex-row justify-center items-center">
            <div className="addTown-form-body p-10 inline-block">
              <form
                className="survive__login grid bg-zinc-600 w-96"
                onSubmit={updateTown}
              >
                <div className="inline-block">
                <fieldset className="pb-7 pt-5">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor=""
                    >
                      Town Name
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="Name of Town"
                      type="text"
                      id="name"
                      className="h3 mb-3 font-weight-normal"
                      placeholder="Name of town"
                      required
                    />
                  </div>
                </fieldset>

                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Town Description
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="Description"
                      type="text"
                      id="description"
                      className="h3 mb-3 font-weight-normal"
                      placeholder="Description"
                      required
                    />
                  </div>
                </fieldset>

                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Population
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="population"
                      type="number"
                      id="population"
                      className="numberOfTown h3 mb-3 font-weight-normal"
                      placeholder="Population"
                      required
                    />
                  </div>
                </fieldset>

                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Latitude
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="latitude"
                      type="text"
                      id="latitude"
                      className="latitude h3 mb-3 font-weight-normal"
                      placeholder="Town Latitude"
                      required
                    />
                  </div>
                </fieldset>
                </div>
                <div className="inline-block">
                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Longitude
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="longitude"
                      type="text"
                      id="longitude"
                      className="longitude"
                      placeholder="Town Longitude"
                      required
                    />
                  </div>
                </fieldset>
                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Map Location
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="Description"
                      type="text"
                      id="mapKey"
                      className="mapKey"
                      placeholder="Map Location"
                      required
                    />
                  </div>
                </fieldset>

                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label
                      className="text-base font-semibold leading-7 text-green-600"
                      htmlFor="townName"
                    >
                      Town Picture
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <input
                      onChange={updateTown}
                      name="Town Picture"
                      type="text"
                      id="image"
                      className="townPic"
                      placeholder="Town Picture"
                      required
                    />
                  </div>
                </fieldset>

                <fieldset className="pb-7">
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label htmlFor="vac">
                      {"Vacancy "}
                      <input
                        id="vac"
                        type="radio"
                        name="townVacancy"
                        onChange={setVacancy}
                        value={true}
                        checked={town.vacancy == true}
                      ></input>
                    </label>
                  </div>
                  <div className="inline-block w-36 pr-5 pt-5">
                    <label htmlFor="novac">
                      {"No Vacancy "}
                      <input
                        id="novac"
                        type="radio"
                        name="townVacancy"
                        onChange={setVacancy}
                        value={false}
                        checked={town.vacancy == false}
                      ></input>
                    </label>
                  </div>
                </fieldset>

                </div>
                

                <fieldset className="pb-7">
                  <button
                    className="float-center rounded-full bg-slate-200 
        w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
        border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    type="submit"
                    onClick={(event) => townSubmit(event)}
                  >
                    {" "}
                    Submit New Town{" "}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            className="addTown-pic"
            src="https://cdn.openart.ai/stable_diffusion/fa0b4e18d8ea4c955a9293b5556b73fcd6277d76_2000x2000.webp"          />
        </div>
      </div>
    </main>
  );
};
