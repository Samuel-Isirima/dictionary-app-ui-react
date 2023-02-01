import React, {useEffect, useState} from "react"

//import "./Definition.css"

const Favourites = (props) => {
const url = 'http:localhost:8000/api/V1/favourites'
const favourites = [favourites, setFavourites] = useState(null)

useEffect(() => {
axios.get(url).then(response => {
    setFavourites(response.data)
})
}, [url])

if(favourites)
{
    
}

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

