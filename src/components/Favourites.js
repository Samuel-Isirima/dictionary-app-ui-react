import React, { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"
import { NotificationManager } from "react-notifications"
import Spinner from "./Spinner"


const Favourites = (props) => {

let isLoggedIn = false
const [cookies, setCookie, removeCookie] = useCookies()
const [favourites, setFavourites] = useState([])
const [fetchFavouritesError, setFetchFavouritesError] = useState()
const [isLoading_removeFromFavourites, setIsLoading_RemoveFromFavourites] = useState(false)
const [removeFromFavouritesError, setRemoveFromFavouritesError] = useState()

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
  })

  const logout = () =>
  {
    /* 
    The API for this project uses JWT for authentication
    The auth tokens are stored in cookies
  
    Hence, to logout(destroy session), destroy the cookies
    */
    removeCookie("authToken")
    removeCookie("authUserName")
    removeCookie("authUserEmail")
  
    navigate("/")
  }
  

let navigate = useNavigate();

useEffect(() => {
  /*
  This hook is used to display the errors that occur during the process of removing 
  a word from favourites.
  The !!addToFavouritesError expression is to make sure that whenever this hook runs, 
  the notifications display is not triggered if the error is empty or has been reset
  */

  if(!!removeFromFavouritesError)
      {
          NotificationManager.error(`${removeFromFavouritesError}`, 'Error!', 5000);
      }
}, [removeFromFavouritesError])


useEffect(() => {
  /*
  This hook is used to display the errors that occur during the process of adding 
  a word to favourites.
  The !!addToFavouritesError expression is to make sure that whenever this hook runs, 
  the notifications display is not triggered if the error is empty or has been reset
  */

  if(!!fetchFavouritesError)
      {
          NotificationManager.error(`${fetchFavouritesError}`, 'Error!', 5000);
      }
}, [fetchFavouritesError])


useEffect(() => {
//To fetch the favourites on page load
fetchFavourites()
}, [])



const fetchFavourites = async () =>
{
let request, headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

try
{
  request = await axiosInstance({
    url: 'favourites',
    method: 'GET',
    headers: headers,
  })
}
catch(error)
{
  if(error.response.status == 401)
    {
      setFetchFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
      setTimeout(()=>
      {
        logout()
      }, 3000)
      return
    }
    else if(error.response.status == 403)  //No access for user country
    {
      navigate('/no-access')
      return
    }

  setFetchFavouritesError(error.response.data.message)
  return
}

const response = await request.data
setFavourites(response.data)

}



const removeFromFavouritesButtonActionHandler = async (event, word) =>
{
  event.preventDefault()
  await removeFromFavourites(word)
}



const removeFromFavourites = async (word) =>
{
setIsLoading_RemoveFromFavourites(true)
let request
const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

try
{
  request = await axiosInstance({
  url: `favourites/${word}`,
  method: 'DELETE',
  headers: headers,})
}
catch(error)
{
  if(error.request.status == 401)
  {
    setRemoveFromFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
    setTimeout(()=>{
      logout()
    }, 3000)
    return
  }
  else if(error.request.status == 403)  //No access for user country
  {
    navigate('/no-access')
    return
  }


  setIsLoading_RemoveFromFavourites(false)
  setRemoveFromFavouritesError(error.response.data.message)
  return
  
}
const newFavourites = await request.data.favourites
setIsLoading_RemoveFromFavourites(false)  

NotificationManager.success(`${word} has been removed from your favourites`, 'Successful!', 5000);
setFavourites([...newFavourites])   //Update favourites variable with copy-initialization of a new array
}


const renderFavourites = favourites.map((favourite) => {
  return (
          <li className="list-group-item" key={favourite.word+"-key"}>
          <div>
              <p style={{float:"left"}}>{favourite.word}</p>
              <button 
              id={favourite.word}
              className="btn btn-danger" 
              style={{float:"right"}}
              word={favourite.word}
              onClick={(event) => removeFromFavouritesButtonActionHandler(event, favourite.word)}
              disabled={isLoading_removeFromFavourites}
              >
              <i className="fa fa-trash"></i>
              </button>
          </div>
         </li>
        )
      })


return (
  <div className="container-fluid bg-white" style={{padding:"100px"}}>
    <div style={{textAlign:"center"}}>
      <h3>
        Favourites
      </h3>
    </div>
    <ul className="list-group list-group-flush">
      {renderFavourites}
    </ul>    
  </div>
  )
}

export default Favourites

