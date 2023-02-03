import React, { useEffect, useState } from "react"
import useAsyncEffect from "use-async-effect"
import axios from "axios"
import "./Search.css"
import Definition from "./Definition"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import Spinner from "./Spinner"
import NotificationManager from "react-notifications/lib/NotificationManager"

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
const [previousSearches, setPreviousSearches] = useState([])
const [isLoading_removeFromPreviousSearches, setIsLoading_RemoveFromPreviousSearches] = useState()
const [removeFromPreviousSearchesError, setRemoveFromPreviousSearchesError] = useState()

useEffect(() => {
  if(isLoggedIn)
    {
    //To fetch the favourites on page load
    fetchPreviousSearches()
    }
  }, [])
  

useEffect(() => {
    /*
    This hook is used to display the errors that occur during the process of removing 
    a word from previous searches.
    The !!removeFromPreviousSearches expression is to make sure that whenever this hook runs, 
    the notifications display is not triggered if the error is empty or has been reset
    */
  
    if(!!removeFromPreviousSearchesError)
        {
            NotificationManager.error(`${removeFromPreviousSearchesError}`, 'Error!', 5000);
        }
  }, [removeFromPreviousSearchesError])
  
  

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
  else if(error.request.status == 403)  //No access for user country
  {
    navigate('/no-access')
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




const fetchPreviousSearches = async () =>
{
if(!isLoggedIn)
  return []

let request, headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

try
{
  request = await axiosInstance({
    url: 'searches',
    method: 'GET',
    headers: headers,
  })
}
catch(error)
{
  if(error.response.status == 401)
    {
      NotificationManager.error("Your login session has expired. You will be redirected to the login page to log in again.", "Error!", 5000)
      setTimeout(()=>
      {
        navigate('/login')
      }, 3000)
      return
    }
    else if(error.response.status == 403)  //No access for user country
    {
      navigate('/no-access')
      return
    }
  return
}
const response = await request.data
setPreviousSearches(response.data)

}


const removeFromPreviousSearchesActionHandler = async (event, id) =>
{
  event.preventDefault()
  await removeFromPreviousSearches(id)
}


const removeFromPreviousSearches = async (id) =>
{
setIsLoading_RemoveFromPreviousSearches(true)
let request
const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

try
{
  request = await axiosInstance({
  url: `searches/${id}`,
  method: 'DELETE',
  headers: headers,})
}
catch(error)
{
  if(error.request.status == 401)
  {
    setRemoveFromPreviousSearchesError("Your login session has expired. You will be redirected to the login page to log in again.")
    setTimeout(()=>{
        navigate('/login')
    }, 3000)
    return
  }

  setIsLoading_RemoveFromPreviousSearches(false)
  setRemoveFromPreviousSearchesError(error.response.data.message)
  return
  
}
const newPreviousSearches = await request.data.searches
console.log(request.data)
setIsLoading_RemoveFromPreviousSearches(false)  

NotificationManager.success(`${word} has been removed from your PreviousSearches`, 'Successful!', 5000);
setPreviousSearches([...newPreviousSearches])   //Update PreviousSearches variable with copy-initialization of a new array
}


const renderPreviousSearches = previousSearches.map((search) => {
  return (
          <li className="list-group-item" key={search.id+"-key"}>
          <div>
              <p style={{float:"left"}}>{search.word}</p>
              <button 
              id={search.word}
              className="btn btn-danger" 
              style={{float:"right"}}
              searchid={search.id}
              onClick={(event) => removeFromPreviousSearchesActionHandler(event, search.id)}
              disabled={isLoading_removeFromPreviousSearches}
              >
              <i className="fa fa-trash"></i>
              </button>
          </div>
         </li>
        )
      })



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

    <div className="card mt-4">
    {
        isLoggedIn? 
        <>
        <h4 style={{margin:"auto"}}>Previous searches</h4>
        {renderPreviousSearches}
        </>
        :
        <></>
        
    }
      </div>
</div>

</div>

  )
}

export default Search;