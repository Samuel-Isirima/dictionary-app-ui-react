import React from "react"

const NoAccess = () => {

/*
Component rendering
*/
    return (
    <div className="container-fluid bg-white" style={{padding:"40px"}}>

        <div className="row">
            <div className="col-12">
               <h4 style={{color:"red"}}>This application is not available in your country.
                              If you are in a local development environment (ie your IP address is 127.0.0.1, 
                              please change it to a valid ip address using any tool of your choice and retry.</h4>
            </div>
        
        <div className="col-8">

        </div>
        </div>
    </div>
  )
}

export default NoAccess

