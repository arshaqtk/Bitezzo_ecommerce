import { useContext, useReducer,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';


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
  const { signup } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showError,setShowError]=useState('')
  const navigate = useNavigate()


  const handlesubmit = async (e) => {

    e.preventDefault()


    try {

      if (state.password !== state.cnfmPswrd) {
        toast.error("password and cnfrm are not same")
        throw new Error("password and cnfrm are not same")

      }

      else if (state.password.length < 8) {
        toast.error("Password is lessthan 8 characters")
        throw new Error("Password is lessthan 8 characters")
      }

      else if (
        !state.username.trim() ||
        !state.email.trim() ||
        !state.password.trim() ||
        !state.cnfmPswrd.trim()
      ) {
        toast.error("Please fill in all fields")
        throw new Error("Please fill in all fields");
      }

      else {
        const newUser = {
          username: state.username,
          email: state.email,
          password: state.password
        }
        await signup(newUser)
      }

    } catch (e) {
      setShowError(e.message)
    }
    console.log(showError)
  }

  return (
    <>
     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
  <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full gap-6">
    
    {/* Left Side Image */}
    <div className="hidden lg:flex w-1/2">
      <img
        src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg"
        alt="Food"
        className="rounded-l-2xl h-full w-full object-cover"
      />
    </div>

    {/* Right Side Form */}
    <div className="flex justify-center items-center w-full lg:w-1/2 p-8">
      <div className="w-full max-w-md">
        {/* Project Name */}
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-6 text-center">
          🍴 Bitezzo
        </h2>

        <form onSubmit={handlesubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              required
              onChange={(e) => dispatch({ type: "USER-NAME", payload: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              required
              onChange={(e) => dispatch({ type: "E-MAIL", payload: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              required
              onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="cnfrm-pswrd" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              required
              onChange={(e) => dispatch({ type: "CNFRM_PSWRD", payload: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Error */}
          <div>
            <p className="text-red-500 text-center text-sm">
              {showError ? showError : null}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-yellow-600 font-semibold hover:underline border-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default Signup