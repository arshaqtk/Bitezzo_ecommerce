import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import bgImg from "../../assets/images/signup-bg.jpg";


function Login() {

  const [email, setEmail] = useState("")
  const [password, SetPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()



  const handleFormData = async (e) => {
    e.preventDefault()
    console.log("form called")
    try {
       if (
        !email.trim() ||
        !password.trim()  ) {
        throw new Error("Please fill in all fields");
      }else{
        await login(email, password)
      }
      

    } catch (e) {
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
            required
            placeholder="Enter Email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
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
            required
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