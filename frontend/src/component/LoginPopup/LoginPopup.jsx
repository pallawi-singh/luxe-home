import React, { useState } from 'react'
import './LoginPopup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"



const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }


    return (
        <div className='login-popup'>
            <form action="" className="login-pop-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h3>{currState}</h3>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setShowLogin(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
                    <div className="login-popup-condition">
                        <input type="checkbox" />
                        <p>By Continuing , i agree to the terms of use & privacy policy.</p>
                    </div>
                    <button type='submit' className='button'>{currState === "Sign Up" ? "Create Account" : "Log In "}</button>

                    {currState === "Login" ? <p>Create a new account?<span onClick={() => setCurrState("Sign Up")}>Click here</span>
                    </p> : <p>Already have  a account?<span onClick={() => setCurrState("Login")}>Login here</span></p>}
                </div>

            </form>

        </div>
    )
}

export default LoginPopup
