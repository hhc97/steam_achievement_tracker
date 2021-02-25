import React from 'react'
import './style.css'

class Game extends React.Component{
    render(){
        const {image, gameName} = this.props

        return(
            <li className="gameContainer">
                <img src={image} className='gameImage'/>
                <div className="vertical-row"></div>
                <div className="gameInfo">{gameName}</div>
            </li>
        )
    }
}

export default Game