import React, { useState } from "react"
import "./Login.css"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"



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
    }
    );
  }
  catch(error)
  {
    setIsLoading(false)
    setLogInError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
  }
    
    const response = await request.data
    console.log(response)
    
    setIsLoading(false)

      if(request.status !== 200)
      {
      setIsLoading(false)
      setLogInError(response.message)
      //Show error message
      }

    let token = response.authorization.token
    let user = response.authorization.user
    //Write token to cookie
    setCookie("authToken", token, { path: '/' })
    setCookie("authUser", user, { path: '/' })
    navigate('/')
  }

   const handleLoginRequest = async e => {
    e.preventDefault()
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
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login