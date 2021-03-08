import React from 'react'
import './style.css'

class Game extends React.Component{
    render(){
        const {image, gameName, completed} = this.props
        return(
            <li className="gameContainer">
                <img src={image} className='gameImage'/>
                <div className="vertical-row"></div>
                <div className="gameBody">
                    <div className="totalProgress">
                        <div className="filledProgress" style={{width:`${completed}%`}}>
                            <span className="currentProgress">{completed + '%'}</span>
                        </div>
                    </div>
                    <div className="gameInfo">{gameName}</div>
                </div>
            </li>
        )
    }
}

export default Game