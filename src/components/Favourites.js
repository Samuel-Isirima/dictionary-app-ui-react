import React from "react"
//import "./Definition.css"

const Favourites = (props) => {
  return (
    <div className="container-fluid bg-white" style={{padding:"100px"}}>

<ul class="list-group list-group-flush">
  <li class="list-group-item">
      
      <div>
          <p style={{float:"left"}}>Word</p>
          <button className="btn btn-danger" style={{float:"right"}}>Remove from favourites</button>
      </div>

  </li>
  <li class="list-group-item">
      
      <div>
          <p style={{float:"left"}}>Word</p>
          <button className="btn btn-danger" style={{float:"right"}}>Remove from favourites</button>
      </div>

  </li>
</ul>
       
    </div>
  )
}

export default Favourites

