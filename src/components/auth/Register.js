import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createNewUser,
  getUserByEmail,
  getTowns,
} from "../../repos/ApiManager"
import "./Register.css"

export const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    townId: 0,
  })
  const [towns, setTowns] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTowns().then((townArray) => {
      setTowns(townArray)
    })
  }, [])

  const registeredNewUser = () => {
    return createNewUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "survive_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    return getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists")
      } else {
        registeredNewUser()
      }
    })
  }

  const updateUser = (event) => {
    const copy = { ...user }
    copy[event.target.id] = event.target.value
    setUser(copy)
  }

  const updateTown = (event) => {
    const copy = { ...user }
    copy.townId = event.target.value
    setUser(copy)
  }

  return (
    <>
      <div className="app-base outer">
        <div className="app-base inner">


      <div className="register-form w-full justify-center flex flex-col">
        <div className="w-full ml-24 mt-24 text-center flex justify-center">
          <div className="w-4/5 flex justify-center">
            <div className="register-add-left bg-white ">
              <div className="w-full form-header">Register </div>
              <form 
                className="grid w-full pt-3"
                onSubmit={handleRegister}
              >
              <div className="w-full flex pl-16">

              <div className="w-1/2 text-left">
                <div className="form-cell">
                  <label className="form-label block">Full Name</label>
                  <input
                      onChange={updateUser}
                      type="text"
                      id="name"
                      className="form-input text text-green-600"
                      placeholder="Enter Name"
                      required
                      autoFocus
                    />
                </div>
                <div className="form-cell">
                <label className="form-label block">Email Address</label>
                <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-input text"
                        placeholder="Email address"
                        required
                      />
                </div>
                <div className="form-cell">
                <label className="form-label block">Password</label>
                <input
                    onChange={updateUser}
                    type="password"
                    id="password"
                    className="form-input text"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-cell">
                  <label className="form-label block">Your Hometown</label>
                  <select
                      className="form-select"

                      required
                      onChange={updateTown}
                    >
                      <option key={0}>Select Town</option>

                      {towns.map((town) => {
                        return (
                          <option key={town.id} value={town.id}>
                            {town.name}
                          </option>
                        );
                      })}
                    </select>
                </div>
              </div>     
              </div>
              <div className="w-full text-right pr-16">
                <button className="button form-button small mt-10" type="submit">Submit</button>
              </div>
              </form>
            </div>
            <div className="register-add-right w-1/2">
            <img
            className="register-add-pic"
            src={process.env.PUBLIC_URL + "/images/register_add.png"} />
        
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}
