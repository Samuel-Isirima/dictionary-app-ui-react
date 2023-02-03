import React, { useState } from "react"
import "./Register.css"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"
import Spinner from "./Spinner"
import { NotificationManager } from "react-notifications"


const Register = (props) => {

const [email, setEmail] = useState()
const [password, setPassword] = useState()
const [username, setusername] = useState()
const [registerError, setRegisterError] = useState()
const [isLoading, setIsLoading] = useState()
const [cookies, setCookie] = useState()
 
let navigate = useNavigate()
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
})


const emailChangeHandler = (event) =>
{
setEmail(event.target.value)
}
  
const usernameChangeHandler = (event) =>
{
setusername(event.target.value)
}

const passwordChangeHandler = (event) =>
{
setPassword(event.target.value)
}

const [passwordType, setPasswordType] = useState("password");
const [passwordInput, setPasswordInput] = useState("");

const togglePassword =(event)=>
{
  event.preventDefault()
  if(passwordType === "password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}


async function registerUser(credentials) 
{
let request

try
{
  request = await axiosInstance({
    url: 'auth/register',
    method: 'POST',
    data: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  })
}
catch(error)
{
  if(error.request.status == 403)  //No access for user country
  {
    navigate('/no-access')
    return
  }
  setIsLoading(false)
  setRegisterError(error.response.data.message)
  return
}
  
  const response = await request.data
  setIsLoading(false)

  NotificationManager.success(`Registration successful. You will be redirected to the login page now to login`, 'Successful!', 5000);
  navigate('/login')  //Make them login in first before setting token
}

 const handleRegisterRequest = async event => 
 {
  event.preventDefault()  
  setRegisterError(null)    //Empty the register error object
  setIsLoading(true)        //Flag that the request is still loading to disable button
  await registerUser({
    username,
    email,
    password,
  })
}

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <label>username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={emailChangeHandler}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <div className="input-group">
              <input
                type={passwordType}
                value={password}
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={passwordChangeHandler}
              />
              <div className="input-group-btn mt-2">
                    <button className="btn " onClick={togglePassword} style={{height:"100%"}}>
                    { passwordType==="password"? <i className="fa fa-eye-slash"></i> :<i className="fa fa-eye"></i> }
                    </button>
              </div>
          </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handleRegisterRequest} className="btn btn-primary" disabled={isLoading}>
              Register
              <span>
              {isLoading? <Spinner/> : ''}
              </span>
            </button>
          </div>
          {registerError? <p style={{color:"red"}}>{registerError}</p> : ''}
        </div>
      </form>
    </div>
  )
}

export default Register