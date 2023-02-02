import React, { useState } from "react"
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router"
import axios from "axios"
import { NotificationManager } from "react-notifications"


const Definition = (props) => {

let isLoggedIn = false
const [cookies, setCookie] = useCookies()
const [isInFavourites, setIsInFavourites] = useState(props.isInFavourites)
const [addToFavouritesError, setAddToFavouritesError] = useState()
const [isLoading_addToFavourites, setIsLoading_AddToFavourites] = useState(false)
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/",
  })
  
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
            <button className="btn mb-5 bg-red" style={{float:"right", color:"white", backgroundColor:"red"}}>
            Remove from favourites
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
            <button className="btn mb-5 bg-orange" style={{float:"right", color:"white", backgroundColor:"orange"}}>
            Add to favourites
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

const addToFavourites = async () =>
{
let request
const headers = {"Content-Type": "application/json", "Authorization": `Bearer ${cookies.authToken}`}

  try
    {
    request = await axiosInstance({
      url: 'favourite',
      params: {
        word: word,
      },
      method: 'PUT',
      headers: headers,
    })

  }
  catch(error)
  {
    setIsLoading_AddToFavourites(false)
    setAddToFavouritesError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
  }
  

  if(!request)
  {
    setAddToFavouritesError("An unexpected error has occured. But don't worry, it's not you, it's us. Please try again later.")
    return
  }

    const response = await request.data
    console.log(response)
    
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
    NotificationManager.error(`${addToFavouritesError}`, 'Error!', 2000);
    }

NotificationManager.success(`${word} has been added to your favourites`, 'Successful!', 2000);
setIsInFavourites(response)
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

