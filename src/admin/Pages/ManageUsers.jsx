import React, { useContext, useEffect, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import Sidebar from "../component/SideBar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUser] = useState([]);
  const {toggleUser}=useContext(AuthContext)
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios_instance.get("/users?role=user");
      setUser(response.data);
    };
    fetchData();
  }, [toggleUser]);

  const toggleBlock = async (id, Authenticated) => {
    toggleUser(id, !Authenticated)
    setUser((prevUsers) =>
      prevUsers.map((u) =>
        u.id === id ? { ...u, isAuthenticated: !Authenticated } : u
      )
    );
  };

  return (
  <div className="flex">
    <div className="w-full p-6 bg-white">
      <h2 className="text-xl font-bold text-gray-900 px-6 py-4">Users List</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Total Users */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center border border-gray-300">
          <h3 className="text-lg font-bold text-green-600">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>

        {/* Blocked Users */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center border border-gray-300">
          <h3 className="text-lg font-semibold text-red-600">Blocked Users</h3>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((user) => !user.isAuthenticated).length}
          </p>
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-xl border border-gray-200 p-4 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {/* Profile Image */}
            <img
              onClick={() => navigate(`/admin/users-detailview/${user.id}`)}
              src={user.image}
              alt={user.username}
              className="w-16 h-16 rounded-full ring-4 ring-gray-200 mb-4 cursor-pointer"
            />

            {/* Username */}
            <h3 className="text-lg font-semibold text-gray-900">{user.username}</h3>

            {/* Email */}
            <p className="text-gray-500 text-sm mb-3">{user.email}</p>

            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                user.isAuthenticated
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isAuthenticated ? "Active" : "Inactive"}
            </span>

            {/* Action Button */}
            <button
              onClick={() => toggleBlock(user.id, user.isAuthenticated)}
              className={`px-7 py-1 rounded-lg font-semibold shadow-sm transition cursor-pointer ${
                user.isAuthenticated
                  ? "bg-black hover:bg-gray-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {user.isAuthenticated ? "Block" : "Unblock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
