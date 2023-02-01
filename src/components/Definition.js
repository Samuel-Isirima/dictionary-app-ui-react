import React from "react"
//import "./Definition.css"

const Definition = (props) => {
  
    const renderDefinitions = props.definitions.map((definition) => {
        return (
            <div className="col-12">
                {definition.definition}
                {definition.examples.map((example) => {
                    <p>{example}</p>
                })}
            </div>
        )
    })
  
    return (
    <div className="container-fluid bg-white" style={{padding:"40px"}}>

        <div className="row">
            <div className="col-12">
                <div>
                <button className="btn mb-5 bg-orange" style={{float:"right", color:"white", backgroundColor:"orange"}}>
                Add to favourites
                </button>
                </div>
            </div>
        <div className="col-4">
            <h3>
                {props.word}
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

