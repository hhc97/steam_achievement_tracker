import React from 'react'
import './style.css'

class ProgressBar extends React.Component{
    render(){
        const {completed} = this.props
        return(
            <div className="totalProgress">
                <div className="filledProgress" style={{width:`${completed}%`}}></div>
            </div>
        )
    }
}

export default ProgressBar;