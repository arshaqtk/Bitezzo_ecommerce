import { createContext, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


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
        toast.error("Email id Already Exists")
      } else {
        
        const userData={...newuser,cart:[],wishlist:[],shippingAddress:[],orders:[]}

        const Postresponse = await Axios_instance.post('/users', userData)

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(Postresponse.data))
        toast.success("Signup SuccessFull")
        navigate('/login')
      }

    } catch (e) {
     console.log(e)
    }
  }

  const login = async (email, password) => {
    try {
    
      const response = await Axios_instance.get(`/users?email=${email}&&password=${password}`)
     
      if (response.data.length === 0) {
        toast.error("The UserName or Password doesn't Match")
      } else {
        setUser(response.data[0])
        
        const localStorageLoginData={isAuthenticated:true,id:response.data[0].id,username:response.data[0].username}
        
        localStorage.setItem("user", JSON.stringify(localStorageLoginData))
        toast.success("Logined Successfully")
        navigate("/")
      }
    } catch (e) {
      console.log(e)
    }
  }


    const logout = () => {
        const log_out=confirm("Are You Sure !")
        if(log_out){
              setUser(null)
        localStorage.removeItem("user")
        navigate('/')
        }
      
    }


  return (<AuthContext.Provider value={{ user, signup, login,logout }}>
    {children}
  </AuthContext.Provider>)
}