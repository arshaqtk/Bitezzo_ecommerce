import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


function ProfilePage() {
  const { user } = useContext(AuthContext)
    console.log(user)
  return (
   <div className="flex justify-center items-center h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center mt-25">

    <img
      src="https://via.placeholder.com/100"
      alt="Profile"
      className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500 shadow-md"
    />


    <h3 className="mt-4 text-xl font-semibold text-gray-800">{user.username}</h3>

    <p className="text-gray-500 text-sm mt-1">{user.email}</p>


    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
      Change Password
    </button>
  </div>
</div>

  )
}

export default ProfilePage