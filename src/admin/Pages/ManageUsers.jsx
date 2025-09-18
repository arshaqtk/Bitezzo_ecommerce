import React, { useContext, useEffect, useState } from "react";
import Axios_instance from "../../api/axiosConfig";
import Sidebar from "../component/SideBar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [users, setUser] = useState([]);
  const { toggleUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios_instance.get("/users?role=user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [toggleUser]);

  const toggleBlock = async (id, isAuthenticated) => {
    try {
      await toggleUser(id, !isAuthenticated);
      setUser((prevUsers) =>
        prevUsers.map((u) =>
          u.id === id ? { ...u, isAuthenticated: !isAuthenticated } : u
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-full p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-900 px-6 py-4">Users List</h2>
        
        {/* Table layout for user data */}
        <div className="overflow-x-auto shadow-md rounded-lg mx-6 mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      onClick={() => navigate(`/admin/users-detailview/${user.id}`)}
                      src={user.image}
                      alt={user.username}
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isAuthenticated
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isAuthenticated ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleBlock(user.id, user.isAuthenticated)}
                      className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 ${
                        user.isAuthenticated
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.isAuthenticated ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}