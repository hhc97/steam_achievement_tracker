import React from 'react'
import './style.css'

class Game extends React.Component {
    render() {
        const { image, redirect, isAchievedBg, opac } = this.props
        return (
            <li className="gameContainer" onClick={redirect} style={{ background: isAchievedBg, opacity: opac }}>
                <img src={image} className='gameImage' />
                <div className="vertical-row"></div>
                <div className="gameBody">
                    {this.props.children}
                </div>
            </li>
        )
    }
}

export default Game