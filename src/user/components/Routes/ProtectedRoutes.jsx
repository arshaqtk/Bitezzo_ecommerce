import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export  const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
if(!user){
    toast.error("Login First")
    return <Navigate to="/login" replace />
}
    return <Outlet />; 
};
