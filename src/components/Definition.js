import React from "react"
//import "./Definition.css"

const Definition = (props) => {
  
    const renderDefinitions = props.definitions.map((definition) => {
        return (
            <div className="col-12">
                {definition.definition}
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
                {word}
            </h3>
        </div>
        <div className="col-8">

            <div className="row">
     

                <div className="col-12">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac libero erat. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam 
                        vehicula justo lectus, vitae condimentum quam tincidunt non. Donec risus lectus, semper a ligula vel, 
                        pretium tincidunt sem. Proin leo metus, accumsan at nulla nec, ultrices maximus velit. Quisque vel nibh 
                        vel risus luctus venenatis. Quisque suscipit sollicitudin sapien vitae commodo. Ut efficitur sollicitudin 
                        lectus ut viverra. Cras euismod massa sit amet faucibus facilisis. Proin tristique porttitor orci at commodo.
                            Maecenas malesuada purus nec malesuada convallis. Class aptent taciti sociosqu ad litora torquent per conubia 
                            nostra, per inceptos himenaeos. Vestibulum eleifend neque iaculis enim placerat pretium. Proin at elementum nulla,
                            a cursus felis. Integer quis vulputate purus. Aliquam id sodales diam, sed tincidunt magna.
                    </p>
                </div>

                <div className="col-12">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac libero erat. 
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam 
                        vehicula justo lectus, vitae condimentum quam tincidunt non. Donec risus lectus, semper a ligula vel, 
                        pretium tincidunt sem. Proin leo metus, accumsan at nulla nec, ultrices maximus velit. Quisque vel nibh 
                        vel risus luctus venenatis. Quisque suscipit sollicitudin sapien vitae commodo. Ut efficitur sollicitudin 
                        lectus ut viverra. Cras euismod massa sit amet faucibus facilisis. Proin tristique porttitor orci at commodo.
                            Maecenas malesuada purus nec malesuada convallis. Class aptent taciti sociosqu ad litora torquent per conubia 
                            nostra, per inceptos himenaeos. Vestibulum eleifend neque iaculis enim placerat pretium. Proin at elementum nulla,
                            a cursus felis. Integer quis vulputate purus. Aliquam id sodales diam, sed tincidunt magna.
                    </p>
                </div>
            </div>

        </div>
        </div>
    </div>
  )
}

export default Definition

