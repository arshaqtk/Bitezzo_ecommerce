import { useContext, useReducer,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { AuthContext } from '../../context/AuthContext'


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
        throw new Error("password and cnfrm are not same")
      }

      else if (state.password.length < 8) {
        throw new Error("Password is lessthan 8 characters")
      }

      else if (
        !state.username.trim() ||
        !state.email.trim() ||
        !state.password.trim() ||
        !state.cnfmPswrd.trim()
      ) {
        throw new Error("Please fill in all fields");
      }

      else {
        const newUser = {
          username: state.username,
          email: state.email,
          password: state.password
        }
        await signup(newUser)
        alert("Registered Successfully")
      }

    } catch (e) {
      setShowError(e.message)
    }
    console.log(showError)
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen  bg-cover bg-center p-4 bg-[#393E46]">
        <div className="bg-[#222831]  shadow-lg rounded-xl p-8 max-w-md w-full">
          <h2 className="text-4xl font-bold text-red-500 mb-6 text-center">Sign Up</h2>

          <form onSubmit={handlesubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-md font-medium text-black-600 ">
                Name
              </label>
              <input
                type="text"
                placeholder="Username"
                className="mt-1 block w-full border text-white border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                className="mt-1 block w-full border text-white border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => dispatch({ type: "E-MAIL", payload: e.target.value })}
              />
            </div>

            
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-md font-medium text-black-900">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="mt-1 block w-full border text-white border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon  className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mt-4">
              <label htmlFor="cnfrm-pswrd" className="block text-md font-medium text-black-900">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="mt-1 block w-full border text-white border-gray-300 rounded-md shadow-sm px-3 py-2 pr-10 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
                onChange={(e) => dispatch({ type: "CNFRM_PSWRD", payload: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon  className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Submit */}
            <div>
              <p className='text-red-600 text-center text-[1.2rem]'>{showError?showError:null}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>

          <p className="mt-4 text-md font-medium text-black-900 text-center">
            Already have an account?{" "}
            <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline border-none">
              Login
            </button>
          </p>
        </div>
      </div>


    </>
  )
}

export default Signup