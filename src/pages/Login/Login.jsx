import React, { useState } from 'react'

function LoginPage() {
    const [userName, setUserName] = useState("")
    const [password, SetPassword] = useState("")

    function 

    return (<form></form>
        <label htmlFor="username">UserName</label>
        <input type="text"
            onChange={setUserName(e.target.value)} /> <br />

        <label htmlFor="password"></label>
        <input type="password"
            onChange={SetPassword(e.target.value)} />
    </div>

    )
}

export default LoginPage