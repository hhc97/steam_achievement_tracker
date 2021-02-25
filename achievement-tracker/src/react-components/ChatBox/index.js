import React from 'react'
import './style.css'

class ChatBox extends React.Component{
    render(){
        const {name, showChatOption} = this.props
        return(
            <div className='chatBox'>
                <div className='chatName'>{name}</div>
                <button className='closeChatButton' onClick={showChatOption}>X</button>
            </div>
        )
    }
}

export default ChatBox;