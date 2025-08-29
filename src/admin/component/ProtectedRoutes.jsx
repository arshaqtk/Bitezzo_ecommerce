import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

export  const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role");
if(role=!"admin"){
    toast.error("Login First")
    return <Navigate to="/login" replace />
}
    return <Outlet />; 
};