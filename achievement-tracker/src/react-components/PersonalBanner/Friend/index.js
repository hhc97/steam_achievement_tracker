import React from 'react'
import friendLogo from './static/logo192.png'
import './style.css'

class Friend extends React.Component{
    render(){
        const {func} = this.props

        return(
            <li className="friendContainer" onClick={func}>
                <img src={friendLogo} className='friendLogo'/>
                <div className="friendName" >{this.props.children}</div>
            </li>
        )
    }
}

export default Friend