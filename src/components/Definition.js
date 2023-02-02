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
  The !!addToFavouritesError expression is to make sure that the notifications display
  is not triggered if the error is empty or has been reset
  */
    if(!!addToFavouritesError)  
        {
            NotificationManager.error(`${addToFavouritesError}`, 'Error!', 5000);
        }
 }, [addToFavouritesError])

 useEffect(() => {
    if(!!removeFromFavouritesError)
        {
            NotificationManager.error(`${removeFromFavouritesError}`, 'Error!', 5000);
        }
 }, [removeFromFavouritesError])


let navigate = useNavigate()

if(cookies.authToken)
{
isLoggedIn = true
}


if(!(props.definitions && props.word))
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
    setIsLoading_AddToFavourites(false)
    setAddToFavouritesError(error.response.data.message)
    return
  }
  


    const response = await request.data
    
    setIsLoading_AddToFavourites(false)

    if(request.status !== 200)
    {
      if(request.status == 401)
        {
          setAddToFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
          setTimeout(()=>{
              navigate('/login')
          }, 3000)
          return
        }
    setIsLoading_AddToFavourites(false)
    setAddToFavouritesError(response.message)
    NotificationManager.error(`${addToFavouritesError}`, 'Error!', 5000);
    }

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
    setIsLoading_RemoveFromFavourites(false)
    setRemoveFromFavouritesError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
  }
  

  if(!request)
  {
    setRemoveFromFavouritesError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
    NotificationManager.error(`${removeFromFavouritesError}`, 'Error!', 5000);
    return
  }

    const response = await request.data
    console.log(response)
    
    setIsLoading_RemoveFromFavourites(false)

    if(request.status !== 200)
    {
      if(request.status == 401)
        {
          setRemoveFromFavouritesError("Your login session has expired. You will be redirected to the login page to log in again.")
          setTimeout(()=>{
              navigate('/login')
          }, 3000)
          return
        }
    setIsLoading_RemoveFromFavourites(false)
    setRemoveFromFavouritesError(response.message)
    NotificationManager.error(`${removeFromFavouritesError}`, 'Error!', 5000);
    }

NotificationManager.success(`${word} has been removed from your favourites`, 'Successful!', 5000);
setIsInFavourites(false)
}

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

