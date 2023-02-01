import React, { useEffect, useState } from "react"
import useAsyncEffect from "use-async-effect"
import axios from "axios"
import "./Search.css"

const Search = (props) => {

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
})
  
const [word, setWord] = useState()
const [isLoading, setIsLoading] = useState()
const [searchError, setSearchError] = useState()
const [definition, setDefinition] = useState()

const searchButtonActionHandler = async (event) =>
{
  event.preventDefault()
  setSearchError(null)
  setIsLoading(true)

  await getDefinition()
}

const searchBarInputHandler = (event) =>
{
  setWord(event.target.value)
}


const getDefinition = async () =>
{
  let request

  try
    {
    request = await axiosInstance({
      url: 'search',
      params: {
        word: word,
      },
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    })

  }
  catch(error)
  {
    setIsLoading(false)
    setSearchError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
  }
  

  if(!request)
  {
    setSearchError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
    return
  }

    const response = await request.data
    console.log(response)
    
    setIsLoading(false)

    if(request.status !== 200)
    {
    setIsLoading(false)
    setSearchError(response.message)
    }


setDefinition(response.data)

}





  return (
<div className="container mt-5">

<div className="row d-flex justify-content-center ">

  <div className="col-md-6">

      <div className="card">
        
        <div className="input-box">
          <input type="text" className="form-control" onChange={searchBarInputHandler}/>
          <i className="fa fa-search"></i>  
          <div className="text-center">
          <button 
            className="btn btn-primary mt-3" 
            disabled={isLoading}
            onClick={searchButtonActionHandler}>
              Go
          </button>       
          </div>
        </div>
        <div>
          {searchError? <p style={{color:"red"}}>{searchError}</p> : ''}
        </div>

      </div>
    
  </div>
  
</div>

</div>

  )
}

export default Search;