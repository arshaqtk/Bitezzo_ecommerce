import React, { useContext, useState } from 'react'
import api from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import bgImg from "../../assets/images/signup-bg.jpg"; 


function Login() {
    const [email, setemail] = useState("")
    const [password, SetPassword] = useState("")
    // const navigate=useNavigate()
    const {login}=useContext(AuthContext)

    const handleFormData= async(e) =>{
         e.preventDefault()
         console.log("form called")
        try{
           await login(email,password)
        //     const response=await api.get(`/users?email=${email}`)
        // const userData=response.data
        // if(userData.password===password){
        //     navigate('/Home')
        // }
    }catch(e){
        alert(e)
    }
    }

    return (<div
  className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat p-4"
  style={{ backgroundImage: `url(${bgImg})` }}
>
  <div className="bg-white/10 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-10 max-w-lg w-full min-h-[450px]">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h2>

    <form onSubmit={handleFormData} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={(e) => SetPassword(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 text-lg"
      >
        Submit
      </button>
    </form>
  </div>
</div>



    )
}

export default Login