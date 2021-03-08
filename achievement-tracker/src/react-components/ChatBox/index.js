import React, {useEffect} from 'react'
import './style.css'

class ChatBox extends React.Component{
    constructor(props){
        super(props)
        const text = ""
        //messages will change to renderMessage method, so we can get 
        //corresponding friend's chatting message.
        //uid in messages will change to the corresponding person's name 
        //message is pass from dashboard
        //  const messages= [{text:'asa',person:"Friend's Name"}]
        //me will be the user object in future

        this.state=  {text:text}
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkMessagePerson = this.checkMessagePerson.bind(this)
    }

    

    onChange(e){
        this.setState({text:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: ""});
        this.props.onSendMessage(this.state.text);
      }

    checkMessagePerson(message){
        //Me will be change to the current user
        const myMessage = message.person == "Me";
        const className = myMessage ? "my-message" : "other-message"
        return className
    }

    render(){
        const {name, showChatOption, messages} = this.props
        return(
            <div className='chatBox'>
                <div className='chatTitle'>
                    <div className='chatName'>{name}</div>
                    <button className='closeChatButton' onClick={showChatOption}>X</button>
                </div>
                <div  className='chatBody'>
                    <div>
                        <ul className='messageList'>
                            {messages.map((message, i) => {
                                return (<li className={this.checkMessagePerson(message) + "-wrapper"} key={i}>
                                            <div className={this.checkMessagePerson(message)}>
                                                <div className='person-name'>
                                                    {message.person}
                                                </div>
                                                <div className='text'>
                                                    {message.text}
                                                </div>
                                            </div>
                                        </li>)
                            })}
                        </ul>
                    </div>
                </div>
                <form className='chatMessage' onSubmit={e=>this.onSubmit(e)}>
                    <input className='message' onChange={e=>this.onChange(e)} placeholder="Enter message" value={this.state.text}/>
                    <button className='sendMessage'>></button>
                </form>
            </div>
        )
    }
}

export default ChatBox;