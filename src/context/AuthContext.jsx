import { createContext, useState } from "react"
import Axios_instance from "../api/axiosConfig"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import profileIcon from "../assets/images/profile-icon-9.png";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user")
      return storedUser ? JSON.parse(storedUser) : ""
    } catch {
      return null
    }
  })
  const [userAuthenticated, setUserAuthenticated] = useState(true)
  const navigate = useNavigate()




  const signup = async (newuser) => {
    try {
      const response = await Axios_instance.get(`/users?email=${newuser.email}`)
      if (response.data.length > 0) {
        toast.error("Email id Already Exists")
      } else {

        const userData = { ...newuser, image: profileIcon, role: "user", isAuthenticated: true, cart: [], wishlist: [], shippingAddress: [], orders: [] }

        const Postresponse = await Axios_instance.post('/users', userData)

        setUser(userData)
        // localStorage.setItem("user", JSON.stringify(Postresponse.data))
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
      }

      if (!response.data[0].isAuthenticated) {
        toast.error("You Have Been Blocked By Admin")
      } else {
        setUser(response.data[0])


        localStorage.setItem("role", response.data[0].role)

        if (response.data[0].role === "user") {

          const localStorageLoginData = { isAuthenticated: true, id: response.data[0].id, username: response.data[0].username, email: response.data[0].email, image: profileIcon }
          localStorage.setItem("user", JSON.stringify(localStorageLoginData))

          navigate("/")
        } else {
          navigate("/admin/dashboard")
        }
        toast.success("Logined Successfully")

      }
    } catch (e) {
      console.log(e)
    }
  }


  //______Editing___user_______






  const logout = () => {
    const log_out = confirm("Are You Sure !")
    if (log_out) {
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("role")
      navigate('/')
    }

  }



  //______Admin___Side

  const toggleUser = async (id, Authenticated) => {
    if (user.id == id) {
      setUserAuthenticated(Authenticated)//toggled value
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("role")
    }
    await Axios_instance.patch(`/users/${id}`, { isAuthenticated: Authenticated });
  }




  return (<AuthContext.Provider value={{ user, signup, login, logout, toggleUser,  }}>
    {children}
  </AuthContext.Provider>)
}