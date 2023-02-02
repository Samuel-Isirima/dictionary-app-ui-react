import React, { useState } from "react"
import "./Login.css"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"
import Spinner from "./Spinner"



const Login = (props) => {
  
const [email, setEmail] = useState()
const [password, setPassword] = useState()
const [logInError, setLogInError] = useState()
const [cookies, setCookie] = useCookies()
const navigate = useNavigate()
const [isLoading, setIsLoading] = useState()
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
})

const emailChangeHandler = (event) =>
{
setEmail(event.target.value)
}
  
const passwordChangeHandler = (event) =>
{
setPassword(event.target.value)
}



async function logUserIn(credentials) 
{
let request
try
{

request = await axiosInstance({
  url: 'auth/login',
  method: 'POST',
  data: JSON.stringify(credentials),
  headers: { "Content-Type": "application/json" },
})

}
catch(error)
{
  setIsLoading(false)
  setLogInError(error.response.data.message)
  return
}
  
const response = await request.data
setIsLoading(false)

let token = response.authorization.token
let user = response.user

//Write token to cookie
setCookie("authToken", token, { path: '/' })
setCookie("authUserName", user.user_name, { path: '/' })
setCookie("authUserEmail", user.email, { path: '/' })
navigate('/')
}

const handleLoginRequest = async event => 
{
  event.preventDefault()
  setLogInError(null)
  setIsLoading(true)
  await logUserIn({
    email,
    password
  })
}

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              required
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={emailChangeHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              required
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={passwordChangeHandler}
            />
          </div>
          <div>
          {logInError?<label style={{color:"red"}}>{logInError}</label>:null} 
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleLoginRequest} className="btn btn-primary" disabled={isLoading}>
              Log in
              <span>
              {isLoading? <Spinner/> : ''}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login