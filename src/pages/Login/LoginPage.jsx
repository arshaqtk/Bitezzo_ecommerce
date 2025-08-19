import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast';


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
        toast.error("Please fill in all fields");
      } else {
        await login(email, password)
      }


    } catch (e) {
      setShowError(e.message)
    }
  }

  return (<div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
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
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              placeholder="Enter Password"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              onChange={(e) => SetPassword(e.target.value)}
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
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-yellow-600 font-semibold hover:underline border-none"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  </div>
</div>



  )
}

export default Login