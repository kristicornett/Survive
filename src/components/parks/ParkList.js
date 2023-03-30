import { useEffect, useState } from 'react'
import { getTowns, deleteTown, getStates, getParkDescription } from '../../repos/ApiManager'
import { useNavigate } from 'react-router-dom'
import { getParks, getParksByState } from '../../repos/ParksRepo'
import * as Modal from 'react-modal'
import './Parks.css'

export const ParkList = () => {
    const [parks, setParks] = useState([])
    const [states, setStates] = useState([])
    const [parkdescriptions, setParkDescriptions] = useState([])
    const [filteredParks, setFilteredParks] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [currentParkDescription, setCurrentParkDescription] = useState()
    let subtitle = {}

    useEffect(
        () => {
            getParks()
            .then((parkArray) => {
                setParks(parkArray.data)
            })

            getStates()
            .then((stateArray) => {
                setStates(stateArray)
            })

        },
        []
    )

    useEffect(
        () => {

            
            getParkDescription()
            .then((parkDescriptionArray) => {
                let newList = []
                setParkDescriptions(parkDescriptionArray)
                parks.forEach((park)=> {
                    let match = parkDescriptionArray.find((pd) => {return pd.parkCode == park.parkCode});
                    if(match){
                        park.localDescription = match.description
                    }
                    newList.push(park)
                })
                setFilteredParks(newList)
            })
        },
        [parks]
    )

    

        function openModal(localDescription) {
            setCurrentParkDescription(localDescription)
            setIsOpen(true);
        }

        function afterOpenModal() {
            // references are now sync'd and can be accessed.
            
        }

        function closeModal() {
            setIsOpen(false);
        }


    const stateChanged = (event) => {
        event.preventDefault()
        const stateCode = event.target.value

        if (stateCode == '') {
            getParks()
            .then((parkArray) => {
                setParks(parkArray.data)
            })
        }

        getParksByState(stateCode)
        .then((parkByStateArray) => {
            setParks(parkByStateArray.data)
        })
           
        
    }

    const modalStyles = {
        

        
      }
    
    const renderViewTrainingsButton = (park) => {

        if(park.localDescription){ 
            return <button className="button rounded-full bg-slate-200 w-36 pt-1, pb- m-3 px-4 py-1 text-sm 
            text-purple-600 font-semibold rounded-none w-24 justify-end text-center border 
            border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
            focus:outline-none focus:ring-2 focus:ring-purple-600 text-center focus:ring-offset-2 
            block" onClick={() => openModal(park.localDescription)}>View Trainings</button>
        }
        else { return ''}
    }
    return (
      <>
        <h1 className="title-text text-5xl text-green-700 text-center mt-8">
          Parks
        </h1>
        <article className="park_List flex flex-row flex-wrap basis-1/4">
          <div className="w-full">
            <section className="font-bold align-text-center w-full">
              <select
                className="font-bold align-text-center mb-2 float-right mr-20 rounded-full bg-slate-200 
                w-36 pt-1, pb-1 m-3 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full 
                border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                required
                onChange={stateChanged}
              >
                <option value="">Choose State</option>
                {states.map((state) => {
                  return <option value={state.code}>{state.name}</option>;
                })}
              </select>
            </section>
          </div>
          <div className="flex content-center flex-row flex-wrap  basis-auto">
            {filteredParks.map((park) => {
              return (
                <>
                  {" "}
                  <section className=" p-4 w-1/4" key={`park--${park.id}`}>
                    <div className="town w-4/5 bg-slate-100 rounded-md drop-shadow-md w-48 place-content-evenly flex flex-col items-center justify-center">
                      {park.fullName}
                      <div className="float-center">
                        {renderViewTrainingsButton(park)}
                      </div>
                    </div>

                    <div></div>
                  </section>
                </>
              );
            })}
          </div>
        </article>
        <Modal
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          isOpen={modalIsOpen}
          className="park-detail-modal"
        >
          <h2 className="font-bold text-2xl">Trainings Available</h2>
          <div className='mt-5 p-5 leading-loose'>{currentParkDescription}</div>
        </Modal>
      </>
    );
}
