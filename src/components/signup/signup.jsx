import React, { useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axiosConfig'
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
    const {signup}=useContext(AuthContext)
    

    const handlesubmit = async (e) => {

        e.preventDefault()

        if (state.password !== state.cnfmPswrd) {
            alert("password and cnfrm are not same")
            return
        } else if (
            !state.username.trim() ||
            !state.email.trim() ||
            !state.password.trim() ||
            !state.cnfmPswrd.trim()
        ) {
            console.log("Please fill in all fields");
        }
        else {

            const newUser = {
                username: state.username,
                email: state.email,
                password: state.password
            }


            try {
               await signup(newUser)
               alert("Registered Successfully")
                // const data = api.post('/users', newUser)
                // if (data.length === 0) {
                //     throw new Error("Error Occured")
                // }
                // navigate('/login')
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <>
            <form onSubmit={handlesubmit} >
                <label htmlFor="username">Name</label>
                <input type="text" placeholder='Username'
                    className='border'
                    required
                    onChange={(e) => dispatch({ type: "USER-NAME", payload: e.target.value })} /> <br />

                <label htmlFor="email">E-mail:</label>
                <input type="email" placeholder='Email'
                    className='border'
                    required
                    onChange={(e) => dispatch({ type: "E-MAIL", payload: e.target.value })} /><br />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='Password'
                    className='border'
                    required
                    onChange={(e) => dispatch({ type: "PASSWORD", payload: e.target.value })} /><br />

                <label htmlFor="cnfrm-pswrd">Confirm Password:</label>
                <input type="password" placeholder='Confirm password'
                    className='border'
                    required
                    onChange={(e) => dispatch({ type: "CNFRM_PSWRD", payload: e.target.value })} /><br />

                <button type='submit' className='border' >Submit</button>
            </form>
            <p>Already Have an Account</p>
        </>
    )
}

export default Signup