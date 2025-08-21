import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export  const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user");
if(user){ 
    return <Navigate to="/" replace />
}
return <Outlet/>
}