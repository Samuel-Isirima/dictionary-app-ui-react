import React, { useState } from "react"
import { redirect } from "react-router"
import "./Header.css"
import { useCookies } from 'react-cookie';
import avatar from "../images/avatar.png"
import { Link } from "react-router-dom";

const Header = (props) => {

  let isLoggedIn = false
  const [cookies, setCookie] = useCookies()

  if(cookies.authToken)
  {
  isLoggedIn = true
  console.log('auth user ', cookies.authUserName)
  console.log('auth user email ', cookies.authUserEmail)
  console.log('auth user ', cookies.authToken)
  }


  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" >Words And Definitions</a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link" style={{color:"white"}}>Favourites 
          <i className="fa fa-star" style={{color:"orange", margin:"2px"}} aria-hidden="true"></i>
          </a>
        </li>
      </ul>
      <form>
            {isLoggedIn? 
            <>
            <img src={avatar} height="30" width="30" />
            <b className="me-2 p-3" style={{color:"white"}}>{cookies.authUserName}</b> 
            <Link to="/login">
            <button className="btn btn-primary"  type="button">Log out</button> 
            </Link>
            </>
            :
            <>
             <button className="btn btn-primary form-control me-2" type="button">Login</button>
            <button className="btn btn-primary" type="button">Register</button>
            </>}
      </form>
    </div>
  </div>
</nav> 

  )
}

export default Header