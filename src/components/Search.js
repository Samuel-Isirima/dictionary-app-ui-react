import React from "react"
import "./Search.css"

const Search = (props) => {
  return (
<div className="container mt-5">

<div className="row d-flex justify-content-center ">

  <div className="col-md-6">

      <div className="card">
        
        <div className="input-box">
          <input type="text" className="form-control"/>
          <i className="fa fa-search"></i>  
          <div className="text-center">
          <button className="btn btn-primary mt-3">
              Go
            </button>       
          </div>
        </div>

      </div>
    
  </div>
  
</div>

</div>

  )
}

export default Search;