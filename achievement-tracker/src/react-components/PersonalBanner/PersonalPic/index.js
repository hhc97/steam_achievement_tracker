import React from 'react'
import "./style.css"
class PersonalPic extends React.Component{
    render(){
        return(
            <img {...this.props} className="personalPic"/>
        )
    }
}

export default PersonalPic