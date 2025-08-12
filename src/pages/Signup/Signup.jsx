import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axiosConfig'

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

function SignupPage() {

    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialValue)

    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(state.password)
        console.log(state.cnfmPswrd)
        if (state.password !== state.cnfmPswrd) {
            alert("password and cnfrm are not same")
            return 
        } else {
            try {
                const data = api.post('/users', state)
                if (data.length === 0) {
                    throw new Error("Error Occured")
                } 
                navigate('/login')
            } catch (e) {
                console.error(e)
                alert("Error On Sign-Up")
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
        </>
    )
}

export default SignupPage