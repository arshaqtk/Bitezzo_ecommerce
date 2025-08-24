import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    // bg-gray-900
       <aside className="w-64  shadow-md bg-[#F5F7FA]  text-[#37474F] h-screen p-4">
        <button onClick={() => navigate("/")} className="text-2xl font-bold text-red-500 cursor-pointer">
                        Bitezzo
                    </button>
     {/* <h2 className="text-xl font-bold my-6">Admin Panel</h2> */}
     <nav className="flex flex-col gap-4 mt-5">
       <Link to="/admin/dashboard">Dashboard</Link>
       <Link to="/admin/users">Users</Link>
       <Link to="/admin/products">Products</Link>
       <Link to="/admin/orders">Orders</Link>
     </nav>
   </aside>
  );
}
