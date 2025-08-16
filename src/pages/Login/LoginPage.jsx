import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


function Login() {

  const [email, setEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()



  const handleFormData = async (e) => {
    e.preventDefault()
    console.log("form called")
    try {
      if (
        !email.trim() ||
        !password.trim()) {
        throw new Error("Please fill in all fields");
      } else {
        await login(email, password)
      }


    } catch (e) {
      setShowError(e.message)
    }
  }

  return (<div className="flex justify-center items-center min-h-screen  bg-cover bg-center p-4 bg-[#393E46]">
    <div className="bg-[#222831]  shadow-lg rounded-xl p-8 max-w-md w-full">
      <h2 className="text-3xl font-bold text-red-500 mb-8 text-center ">Login</h2>

      <form onSubmit={handleFormData} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="Enter Email"
            className="mt-1 block w-full text-white border border-gray-300 rounded-md shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className='relative'>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            placeholder="Enter Password"
            className="mt-1 block w-full border text-white border-gray-300 rounded-md shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => SetPassword(e.target.value)}


          />
          <button type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}>

            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div>
          <p className='text-red-600 text-center text-[1.2rem]'>{showError ? showError : null}</p>
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 text-lg"
        >
          Submit
        </button>
      </form>
      <p className="mt-4 text-md font-medium text-black-900 text-center">
        Don't have an account?{" "}
        <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline border-none">
          Sign-up
        </button>
      </p>
    </div>
  </div>



  )
}

export default Login