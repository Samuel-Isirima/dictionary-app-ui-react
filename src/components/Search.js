import React, { useEffect, useState } from "react"
import useAsyncEffect from "use-async-effect"
import axios from "axios"
import "./Search.css"
import Definition from "./Definition"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import Spinner from "./Spinner"

const Search = (props) => {
let isLoggedIn = false
const [cookies, setCookie] = useCookies()
let navigate = useNavigate();

if(cookies.authToken)
{
isLoggedIn = true
}

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
  setDefinition('')
  setWord(event.target.value)
}


const getDefinition = async () =>
{
  let request
  let headers = {"Content-Type": "application/json"}

  if(isLoggedIn)
  headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}
  
try
{
  request = await axiosInstance({
    url: 'search',
    params: 
    {
      word: word,
    },
    method: 'GET',
    headers: headers,
  })

}
catch(error)
{
  if(error.request.status == 401)
  {
    setSearchError("Your login session has expired. You will be redirected to the login page to log in again.")
    setTimeout(()=>
    {
      navigate('/login')
    }, 3000)
    return
  }

  setIsLoading(false)
  setSearchError(error.response.data.message)
  return
}


const response = await request.data
setIsLoading(false)
setDefinition(response)

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
              <span>
              {isLoading? <Spinner/> : ''}
              </span>
          </button>       
          </div>
        </div>
        <div>
          {searchError? <p style={{color:"red"}}>{searchError}</p> : ''}
        </div>

      </div>
    
  </div>
  <div className="card mt-4">
    {
        !!definition?
        <Definition definitions={definition.data} word={word} isInFavourites={definition.in_favourites}/>
        :
        <>
        </>
    }
      </div>
</div>

</div>

  )
}

export default Search;