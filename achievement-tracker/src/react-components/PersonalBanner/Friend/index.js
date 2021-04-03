import React from 'react'
import friendLogo from './static/logo192.png'
import './style.css'
import { BsTrash } from 'react-icons/bs'
import { IoLogoOctocat } from 'react-icons/io'
import { TiTick, TiDelete } from 'react-icons/ti'

class Friend extends React.Component{
    render(){
        const {chat, deleteFriend, pendingStatus, accept, decline} = this.props;

        return(
            <li className="friendContainer" onClick={chat}>
                <div className="friendLeft">
                    <IoLogoOctocat className='friendLogo'/>
                    <div className="friendName" >{this.props.children}</div>
                </div>
                {pendingStatus ? 
                    <div className ="friendPendingButton">
                        <TiTick className="friendPendingAccept" onClick={accept}/>
                    <   TiDelete className="friendPendingDecline" onClick={decline}/>
                    </div> :
                <BsTrash className="deleteFriend" onClick={deleteFriend}/>
                }   
            </li>
        )
    }
}

export default Friend