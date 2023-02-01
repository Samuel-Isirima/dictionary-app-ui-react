import React from "react"
import { redirect } from "react-router"
import "./Header.css"

const Header = (props) => {
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
      <form className="d-flex">
      <button className="btn btn-primary form-control me-2" type="button">Login</button>
      <button className="btn btn-primary" type="button">Register</button>
      </form>
    </div>
  </div>
</nav> 

  )
}

export default Header