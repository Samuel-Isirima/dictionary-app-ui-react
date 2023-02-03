/*
line 9; Imports
line 18; Variable Definitions
line 29; Method Definitions
line 276; Component rendering
*/

import React, { useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"
import { NotificationManager } from "react-notifications"
import Spinner from "./Spinner"


const Definition = (props) => {

let isLoggedIn = false
const [cookies, setCookie] = useCookies()
const [isInFavourites, setIsInFavourites] = useState(props.isInFavourites)
const [addToFavouritesError, setAddToFavouritesError] = useState()
const [removeFromFavouritesError, setRemoveFromFavouritesError] = useState()
const [isLoading_addToFavourites, setIsLoading_AddToFavourites] = useState(false)
const [isLoading_removeFromFavourites, setIsLoading_RemoveFromFavourites] = useState(false)
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
  })
  
useEffect(() => {
  /*
  This hook is used to display the errors that occur during the process of adding 
  a word to favourites.
  The !!addToFavouritesError expression is to make sure that whenever this hook runs, 
  the notifications display is not triggered if the error is empty or has been reset
  */
    if(!!addToFavouritesError)  
        {
            NotificationManager.error(`${addToFavouritesError}`, 'Error!', 5000);
        }
 }, [addToFavouritesError])


 useEffect(() => {
  /*
  This hook is used to display the errors that occur during the process of adding 
  a removing a word from favourites.
  The !!addToFavouritesError expression is to make sure that whenever this hook runs, 
  the notifications display is not triggered if the error is empty or has been reset
  */
    if(!!removeFromFavouritesError)
        {
            NotificationManager.error(`${removeFromFavouritesError}`, 'Error!', 5000);
        }
 }, [removeFromFavouritesError])


let navigate = useNavigate()

/*
The api that runs the backend of this project uses JWT for authentication
and this project stores the token in cookies for authentication purposes.
Hence, if the authToken(which is the authentication cookie) exists, 
it means the user is logged in.
*/
if(cookies.authToken)   
{
isLoggedIn = true
}


if(!(props.definitions && props.word))    //Return and empty element if the properties are empty
    return (<></>)    

const definitions = props.definitions
const word = props.word

const renderDefinitions = definitions.map((definition) => {
    return (
        <>
        <div className="col-12">
            <p>
            {definition.definition}
            </p>
            {
            /*
            If the definition comes with examples from the api, render them, if not, 
            render an empty element. 
            I used the ? :  syntax
            if true? runs : doesn't
            */
            definition.examples? 
              <>                    
              <p><b>Examples</b></p>
              {definition.examples.map((example) => {
                  return (
                  <p>
                  <i><b>{example.text}</b></i>
                  </p>
                  )
              })
              }
              </>
            :
              <>
              </>
            }
            
            
        </div>
        <hr/>
        </>
    )
})


function renderFavouriteActionButton()
{
/* 
This method decides whether to display an "add to favourites" button or a "remove from favourites"
based on the current state of the isInFavourites(boolean) object
*/
    if(isInFavourites)
    {
        return (
            <>
            <div>
                <button 
                className="btn mb-5 bg-red" 
                style={{float:"right", color:"white", backgroundColor:"red"}}
                onClick={removeFromFavouritesButtonActionHandler}
                disabled={isLoading_removeFromFavourites}
                >
                Remove from favourites
                {isLoading_removeFromFavourites? <Spinner/> : ''}
                </button>
            </div>
            </>
        )
    }
    else
    {
        return (
            <>
            <div>
            <button 
            className="btn mb-5 bg-orange" 
            style={{float:"right", color:"white", backgroundColor:"orange"}}
            onClick={addToFavouritesButtonActionHandler}
            disabled={isLoading_addToFavourites}
            >
            Add to favourites
            {isLoading_addToFavourites? <Spinner/> : ''}

            </button>
            </div>
            </>
        )
    }
}



const addToFavouritesButtonActionHandler = async event =>
{
    event.preventDefault()
    await addToFavourites()
}

const removeFromFavouritesButtonActionHandler = async event =>
{
    event.preventDefault()
    await removeFromFavourites()
}

const addToFavourites = async () =>
{
setIsLoading_AddToFavourites(true)
let request
const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}
//The api expects a word parameter in the put request to the add to favourites route as is specified in the options below
try
{
  request = await axiosInstance({
    url: 'favourites',
    params: {
      word: word,
    },
    method: 'POST',
    headers: headers,
  })

}
catch(error)
{
    if(error.request.status == 401) 
    {
      /* 
      By the API specification, a response status of 401 means that the user's auth token has expired, 
      so they need to login again to validate it, hence redirect them to the login page

      */
      setAddToFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
      setTimeout(()=>{
          navigate('/login')
      }, 3000)
      return
    }
    else if(error.request.status == 403)  //No access for user country
    {
      navigate('/no-access')
      return
    }

  setIsLoading_AddToFavourites(false)
  setAddToFavouritesError(error.response.data.message)
  return  
}

//If the method runs up to this place, it means it was successful with a 200 status
const response = await request.data
setIsLoading_AddToFavourites(false)
NotificationManager.success(`${word} has been added to your favourites`, 'Successful!', 5000);
setIsInFavourites(true)
}





const removeFromFavourites = async () =>
{
setIsLoading_RemoveFromFavourites(true)
let request
const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

try
{
  request = await axiosInstance({
    url: `favourites/${word}`,
    params: {
      word: word,
    },
    method: 'DELETE',
    headers: headers,
  })

}
catch(error)
{
  if(error.request.status == 401) 
  {
    /* 
    By the API specification, a response status of 401 means that the user's auth token has expired, 
    so they need to login again to validate it, hence redirect them to the login page

    */
    setAddToFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
    setTimeout(()=>{
        navigate('/login')
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
}


const response = await request.data
console.log(response)

setIsLoading_RemoveFromFavourites(false)
NotificationManager.success(`${word} has been removed from your favourites`, 'Successful!', 5000);
setIsInFavourites(false)
}


/*
Component rendering
*/
    return (
    <div className="container-fluid bg-white" style={{padding:"40px"}}>

        <div className="row">
            <div className="col-12">
                {
                isLoggedIn?
                renderFavouriteActionButton()
                :
                <>
                </>
                }
            </div>
        <div className="col-4">
            <h3>
                {word}
            </h3>
        </div>
        <div className="col-8">

            <div className="row">
                {renderDefinitions}
            </div>

        </div>
        </div>
    </div>
  )
}

export default Definition

