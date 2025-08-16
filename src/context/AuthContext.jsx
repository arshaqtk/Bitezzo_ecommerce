import { createContext, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    try{
      const storedUser=localStorage.getItem("user")
      return storedUser?JSON.parse(storedUser):""
    }catch{
      return null
    }
  })
  const navigate = useNavigate()

  const signup = async (newuser) => {
    try {
      const response = await Axios_instance.get(`/users?email=${newuser.email}`)
      if (response.data.length > 0) {
        throw new Error("Email id Already Exists")
      } else {
        const userData={...newuser,cart:[],order:[]}
        const Postresponse = await Axios_instance.post('/users', userData)
        // setUser(Postresponse.data)
        // localStorage.setItem("user", JSON.stringify(Postresponse.data))
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
      const response = await Axios_instance.get(`/users?email=${email}&&password=${password}`)
      if (response.data.length === 0) {
        throw new Error("The UserName or Password doesn't Match")
      } else {
        setUser(response.data[0])
        const localStorageLoginData={isAuthenticated:true,id:user.id,username:user.username}
        console.log(localStorageLoginData)
        localStorage.setItem("user", JSON.stringify(localStorageLoginData))
        navigate("/")
      }
    } catch (e) {
      throw (e)
    }
  }

    const logout = () => {
    setUser("")
    localStorage.removeItem("user")
  }



  return (<AuthContext.Provider value={{ user, signup, login,logout }}>
    {children}
  </AuthContext.Provider>)
}