import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom";



const PrivateRoute = () => {

    const {currentUser}=useSelector(state=>state.user)
  return (
    currentUser ? <Outlet/>:<Navigate to="/signIn"/>
  )
}

export default PrivateRoute