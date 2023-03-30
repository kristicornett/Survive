import {Navigate, useLocation} from "react-router-dom"

export const Authorized = ({children}) => {
    const location = useLocation()

    if(localStorage.getItem('survive_user')){
        return children
    }
    else{
        return <Navigate t
        to={`/login/${location.search}`}
        replace
        state={{ location }} />
    }

}