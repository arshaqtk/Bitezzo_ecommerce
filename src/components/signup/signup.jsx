import React, { useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axiosConfig'
import { AuthContext } from '../../context/AuthContext'
import bgImg from "../../assets/images/signup-bg.jpg"; 

function reducer(state, action) {
    switch (action.type) {
        case 'USER-NAME':
            return { ...state, username: action.payload }
        case 'E-MAIL':
            return { ...state, email: action.payload }
        case 'PASSWORD':
            return { ...state, password: action.payload }
        case 'CNFRM_PSWRD':
            return { ...state, cnfmPswrd: action.payload }
    }
}
const initialValue = {
    username: "",
    email: "",
    password: "",
    cnfmPswrd: ""
}

function Signup() {

    // const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialValue)
    const {signup}=useContext(AuthContext)
    const navigate=useNavigate()
    

    const handlesubmit = async (e) => {

        e.preventDefault()

        if (state.password !== state.cnfmPswrd) {
            alert("password and cnfrm are not same")
            return
        } else if (
            !state.username.trim() ||
            !state.email.trim() ||
            !state.password.trim() ||
            !state.cnfmPswrd.trim()
        ) {
            console.log("Please fill in all fields");
        }
        else {

            const newUser = {
                username: state.username,
                email: state.email,
                password: state.password
            }


            try {
               await signup(newUser)
               alert("Registered Successfully")
                // const data = api.post('/users', newUser)
                // if (data.length === 0) {
                //     throw new Error("Error Occured")
                // }
                // navigate('/login')
            } catch (e) {
                // console.error(e)
                alert(e)
            }
        }
    }

    return (
        <>
        <div className="flex justify-center items-center min-h-screen  bg-cover bg-center p-4" style={{ backgroundImage: `url(${bgImg})`}}>
  <div className="bg-white/10 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-8 max-w-md w-full">
    <h2 className="text-4xl font-bold text-black-800 mb-6 text-center">Sign Up</h2>

    <form onSubmit={handlesubmit} className="space-y-4">
      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-md font-medium text-black-900 ">
          Name
        </label>
        <input
          type="text"
          placeholder="Username"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          onChange={(e) => dispatch({ type: "USER-NAME", payload: e.target.value })}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-md font-medium text-black-900">
          E-mail
        </label>
        <input
          type="email"
          placeholder="Email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          onChange={(e) => dispatch({ type: "E-MAIL", payload: e.target.value })}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-md font-medium text-black-900">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })}
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="cnfrm-pswrd" className="block text-md font-medium text-black-900">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required
          onChange={(e) => dispatch({ type: "CNFRM_PSWRD", payload: e.target.value })}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </form>

    <p className="mt-4 text-md font-medium text-black-900 text-center">
      Already have an account?{" "}
      <button onClick={()=>navigate('/login')}className="text-blue-600 hover:underline border-none">
        Login
      </button>
    </p>
  </div>
</div>

            
        </>
    )
}

export default Signup