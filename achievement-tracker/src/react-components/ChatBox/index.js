import React, { useRef } from 'react'
import ENV from '../../config.js'
import io from 'socket.io-client'
import './style.css'
import { getMessages } from '../../actions/chat.js'
const API_HOST = ENV.api_host

class ChatBox extends React.Component {
    constructor(props) {
        super(props)
        const text = ""
        const messages = []
        const chatRoomId = ""
        const socket = io.connect(API_HOST)
        this.state = {
            text: text,
            socket: socket,
            messages: messages,
            chatRoomId: chatRoomId
        }


        this.state.socket.on("chat", (data) => {
            const newMessages = this.state.messages
            newMessages.push(data)
            this.setState({ messages: newMessages })
        })

        this.myRef = React.createRef()
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkMessagePerson = this.checkMessagePerson.bind(this)
    }
    async componentDidMount() {
        if (this.state.socket !== undefined) {
            // console.log("connect to socket...")
        }
        await getMessages(this, this.props.userName, this.props.friendName)
        this.state.socket.emit("room", { name: this.props.userName, chatRoomId: this.state.chatRoomId })
        this.state.socket.on('joined', room => {
            // console.log('i have joined', room)
        })

    }

    async componentDidUpdate(prevProps) {
        if (this.props.friendName !== prevProps.friendName) {
            await getMessages(this, this.props.userName, this.props.friendName)
            this.state.socket.emit("room", { name: this.props.userName, chatRoomId: this.state.chatRoomId })
            this.state.socket.on('joined', room => {
                // console.log('I have joined', room)
            })
        }
    }

    componentWillUnmount() {
        this.state.socket.emit("close")
        // console.log("disconnect from socket...")
    }

    onChange(e) {
        this.setState({ text: e.target.value })
        const elem = e.target
        const toBeAddHeight = (elem.scrollHeight) + "px";
        if (parseInt(toBeAddHeight.substring(0, toBeAddHeight.length - 2)) <= 110) {
            elem.style.height = toBeAddHeight
        }
    }
    onSubmit(e) {
        e.preventDefault();
        //check if its empty message
        if (this.state.text === "") {
            return;
        }

        const data = {
            name: this.props.userName,
            content: this.state.text,
            time: Date.now()
        }
        //change textarea height back to normal
        e.target.children[0].style.height = "70%"
        //update our own message
        const newMessages = this.state.messages
        newMessages.push(data)
        this.setState({ messages: newMessages })
        //auto scroll the chatbox to bottom
        this.myRef.current.scrollTop = 0
        //send message through socket
        this.state.socket.emit('chat', { id: this.state.chatRoomId, data: data })

        this.setState({ text: "" });
    }

    checkMessagePerson(message) {
        //Me will be change to the current user
        const myMessage = message.name == this.props.userName;
        const className = myMessage ? "my-message" : "other-message"
        return className
    }


    render() {
        const { friendName, showChatOption } = this.props
        return (
            <div className='chatBox'>
                <div className='chatTitle'>
                    <div className='chatName'>{friendName}</div>
                    <button className='closeChatButton' onClick={showChatOption}>X</button>
                </div>
                <div className='chatBody' ref={this.myRef}>
                    <div>
                        <ul className='messageList'>
                            {this.state.messages.map((message, i) => {
                                return (<li className={this.checkMessagePerson(message) + "-wrapper"} key={i}>
                                    <div className={this.checkMessagePerson(message)}>
                                        <div className='person-name'>
                                            {message.name}
                                        </div>
                                        <div className='text'>
                                            {message.content}
                                        </div>
                                    </div>
                                    <div className={'chatMessageTime-' + this.checkMessagePerson(message)}>
                                        {new Date(message.time).toLocaleString('en-US')}
                                    </div>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>
                <form className='chatMessage' onSubmit={e => this.onSubmit(e)}>
                    <textarea
                        className='message'
                        onChange={e => this.onChange(e)}
                        placeholder="Enter message"
                        value={this.state.text}
                        rows="1"
                        style={{ maxHeight: "100px" }}
                    >
                    </textarea>
                    <button className='sendMessage'>Send</button>
                </form>
            </div>
        )
    }
}

export default ChatBox;