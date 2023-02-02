import React, { useState } from "react"
import { redirect, useNavigate } from "react-router"
import "./Header.css"
import { useCookies } from 'react-cookie';
import avatar from "../images/avatar.png"
import { Link } from "react-router-dom";

const Header = (props) => {

  let navigate = useNavigate()
  let isLoggedIn = false
  const [cookies, setCookie, removeCookie] = useCookies()

  if(cookies.authToken)
  {
  isLoggedIn = true
  }


  const logout = () =>
  {
    removeCookie("authToken")
    removeCookie("authUserName")
    removeCookie("authUserEmail")

    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/" >Words And Definitions</a>
    <div className="collapse navbar-collapse">
      {isLoggedIn?
      <>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link" href="/favourites" style={{color:"white"}}>Favourites 
          <i className="fa fa-star" style={{color:"orange", margin:"2px"}} aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      </>
      :
      <>
      </>
      }
      <span className="ms-auto">
            {isLoggedIn? 
            <>
            <img src={avatar} height="30" width="30" />
            <b className="me-2 p-3" style={{color:"white"}}>{cookies.authUserName}</b> 
            <button className="btn btn-primary"  type="button" onClick={logout}>Log out</button> 
            </>
            :
            <>
            <Link to="/login">
             <button className="btn btn-primary me-2" type="button" >Login</button>
            </Link>
            <Link to="/register">
            <button className="btn btn-primary" type="button">Register</button>
            </Link>
            </>}
      </span>
    </div>
  </div>
</nav> 

  )
}

export default Header
