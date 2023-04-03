import { useEffect, useState } from "react";
import { getTowns, deleteTown } from "../../repos/ApiManager";
import { useNavigate } from "react-router-dom";
import "./Town.css";
import { Map } from "../nav/Map";
import "../views/UserViews.css";

export const TownList = () => {
  const [towns, setTowns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshTowns();
  }, []);

  const deleteTowns = (event, townId) => {
    event.preventDefault();

    deleteTown(townId).then((data) => refreshTowns());
  };

  const refreshTowns = () => {
    getTowns().then((townArray) => {
      setTowns(townArray);
    });
  };
  return (
    <>
      <div className="home-bar towns text-left">
        <span className="town-text ml-4">Towns</span>
      </div>
      <button
        type="submit"
        className="town__button float-right bg-slate-200 
        w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold
        border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        onClick={() => navigate("/towns/add")}
      >
        {" "}
        Add A Town{" "}
      </button>
      <article className="town_List flex flex-row flex-wrap basis-1/4">
        {towns.map((town) => {
          return (
            <section className="p-4 w-1/3" key={`town--${town.id}`}>
              <div className="card bg-slate-100 rounded-md w-96 drop-shadow-md">
                <div className="town-header flex align-middle p-4">
                <img
                      className="card-icon"
                      src={process.env.PUBLIC_URL + "/images/town_icon.png"}
                    ></img>
                  
                  <div className="font-bold -ml-10 mb-4 w-full text-center">
                    <span className=" font-bold text-xl ml-20">
                      {town.name}
                    </span>
                  </div>
                  <button
                    className=" button pt-1 px-4 py-1 text-sm
                    text-red-900 font-semibold text-center
                    hover:text-white 
                    focus:outline-none focus:ring-2 focus:ring-red-600 text-center focus:ring-offset-2  inline mb-4"
                    id="delete_town"
                    onClick={(event) => deleteTowns(event, town.id)}
                  >
                    X
                  </button>
                </div>
                <div className="card-body">
                  <span
                    className=" bg-slate-200 w-36 pt-1 mt-4 ml-28 content-center px-4 py-1 text-sm 
                            text-purple-600 font-semibold rounded-none w-24 justify-center text-center place-center border 
                            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                            focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
                            block"
                    onClick={() => navigate(`/towns/${town.id}/`)}
                  >
                    {town.vacancy ? "Homes available." : "No vacancy."}
                  </span>
                
                <div>
                  <img className="mt-8 p-2" src={town.image} />
                </div>
                <span className="inline-flex">{town.description} </span>
                <div className="town-delete">
                 
                </div>
                </div>
              </div>
            </section>
          );
        })}
      </article>
    </>
  );
};

{
  /* <section className=" p-4 w-1/4" key={`park--${park.id}`}>
                   
                    
                   <div className="card bg-slate-100 rounded-md drop-shadow-md  flex flex-col items-center ">
                   <div className='card-header'>
                     <img className="card-icon" src={process.env.PUBLIC_URL + "/images/park_icon.png"}></img>
                   </div>
                   <div className="card-body">
                     {park.fullName}
                     <div className='my-2'>
                       {renderViewTrainingsButton(park)}
                       
                       </div>
                     </div>
                   </div>
                   
                   
                   <div></div>
                   </section> */
}
