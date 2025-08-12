import React, { useContext, useState } from 'react'
import api from '../../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function Login() {
    const [email, setemail] = useState("")
    const [password, SetPassword] = useState("")
    // const navigate=useNavigate()
    const {login}=useContext(AuthContext)

    const handleFormData= async(e) =>{
         e.preventDefault()
         console.log("form called")
        try{
           await login(email,password)
        //     const response=await api.get(`/users?email=${email}`)
        // const userData=response.data
        // if(userData.password===password){
        //     navigate('/Home')
        // }
    }catch(e){
        alert(e)
    }
    }

    return (<form onSubmit={handleFormData}>
        <label htmlFor="email">email</label>
        <input type="email" id='email' placeholder='Enter Email' className='border'
            onChange={(e)=>setemail(e.target.value)} /> <br />

        <label htmlFor="password">Password</label>
        <input type="password" id='password' className='border'
            onChange={(e)=>SetPassword(e.target.value)} />

        <button type='submit'>Submit</button>
    </form>

    )
}

export default Login