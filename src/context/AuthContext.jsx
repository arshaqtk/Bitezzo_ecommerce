import { createContext, useState } from "react"
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null)
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const navigate = useNavigate()

  const signup = async (newuser) => {
    try {
      const response = await api.get(`/users?email=${newuser.email}`)
      if (response.data.length > 0) {
        throw new Error("Email id Already Exists")
      } else {
        const Postresponse = await api.post('/users', newuser)
        setUser(Postresponse.data)
        localStorage.setItem("user", JSON.stringify(Postresponse.data))
        navigate('/login')
      }

    } catch (e) {
      throw (e)
    }
  }

  const login = async (email, password) => {
    try {
      alert(email,password
      )
      const response = await api.get(`/users?email=${email}&&password=${password}`)
      if (response.data.length === 0) {
        throw new Error("The UserName or Password doesn't Match")
      } else {
        setUser(response.data[0])
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(response.data[0]))
        console.log(response.data[0].id)
        alert("success")

        navigate("/")
      }
    } catch (e) {
      throw (e)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (<AuthContext.Provider value={{ user, signup, login, logout }}>
    {children}
  </AuthContext.Provider>)
}