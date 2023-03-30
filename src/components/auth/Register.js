import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewUser,
  getUserByEmail,
  getTowns,
} from "../../repos/ApiManager";

export const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    townId: 0,
  });
  const [towns, setTowns] = useState([]);
  const localSurviveUser = localStorage.getItem("survive_user");
  const surviveUserObject = JSON.parse(localSurviveUser);

  let navigate = useNavigate();

  useEffect(() => {
    getTowns().then((townArray) => {
      setTowns(townArray);
    });
  }, []);

  const registeredNewUser = () => {
    return createNewUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "survive_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    return getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        registeredNewUser();
      }
    });
  };

  const updateUser = (event) => {
    const copy = { ...user };
    copy[event.target.id] = event.target.value;
    setUser(copy);
  };

  const updateTown = (event) => {
    const copy = { ...user };
    copy.townId = event.target.value;
    setUser(copy);
  };

  const handleRegisterButton = (event) => {
    event.preventDefault();

    const sendNewUserToAPI = {};
  };

  return (
    <main className="" style={{ textAlign: "center" }}>
      <div>
        <h1 className="text-6xl p-8 decoration-8 text-center text-green-600 text-shadow shadow-indigo-500 font-bold">
          Register to Survive
        </h1>
      </div>
      <div className="grid h-screen place-items-center">
        <div className="grid place-items-center w-1/2 px-10 py-14 -mt-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-green-400 to-purple-700">
          <form
            className="survive__login bg-zinc-600 w-96"
            onSubmit={handleRegister}
          >
            <fieldset className="pb-7 pt-5">
              <div className="inline-block w-36 pr-5 pt-5">
                <label
                  className="text-base font-semibold leading-7 text-green-600"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
              </div>
              <div className="inline-block pr-5 pt-5">
                <input
                  onChange={updateUser}
                  type="text"
                  id="name"
                  className="form-control text-green-600"
                  placeholder="Enter Name"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset className="pb-7">
              <div className="inline-block pr-5 w-36 pt-5">
                <label
                  className="text-base font-semibold leading-7 text-green-600"
                  htmlFor="email"
                >
                  {" "}
                  Email address{" "}
                </label>
              </div>
              <div className="inline-block  pr-5 pt-5">
                <input
                  onChange={updateUser}
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email address"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="pb-7">
              <div className="inline-block pr-5 w-36 pt-5">
                <label
                  className="text-base font-semibold leading-7 text-green-600"
                  htmlFor="email"
                >
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="inline-block pr-5 pt-5">
                <input
                  onChange={updateUser}
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="pb-7">
              <div className="form-group inline-block pr-5 w-36 pt-5">
                <label
                  className="text-base font-semibold leading-7 text-green-600"
                  htmlFor="email"
                >
                  {" "}
                  Choose Town{" "}
                </label>
              </div>
              <div className="inline-block pr-5 pt-5">
                <select
                  style={{ width: "177px", height: "24px" }}
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
            </fieldset>
            <fieldset className="pb-3">
              <button
                className="rounded-full bg-slate-200 w-36 m-3 px-4 pb-1 mb-3 text-sm text-purple-600 font-semibold rounded-full border border-green-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                type="submit"
              >
                {" "}
                Register{" "}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
};
