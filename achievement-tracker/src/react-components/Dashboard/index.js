import React from "react";
import { HeaderButton, HeaderImage, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import logo from './../../logo.svg'
import profilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import settingLogo from './../Dashboard/Static/settingLogo.png'
import { PersonalPic, BannerContainer, BannerLink, Friend, FriendList } from '../PersonalBanner'
import { AchievementContainer, Game } from '../Achievement'
import ChatBox from '../ChatBox';
import ProgressBar from '../Achievement/ProgressBar'
import { withRouter } from 'react-router-dom'
import UserKeys from '../UserKeys'
import './style.css'



class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        //friendList and friendListMessages and game will be pull from database from phase2
        const friendList = ["leo", 'lee', 'lao', 'loo', 'loe', 'lam', 'lsk', 'lkl', 'ldl', 'lbh', 'lsb']
        const friendListMessages = [
            { name: "leo", messages: [{ text: 'asa', person: "leo" }] },
            { name: "lee", messages: [{ text: 'hi', person: "lee" }] },
            { name: "lao", messages: [] },
            { name: "loo", messages: [] },
            { name: "loe", messages: [{ text: 'ppp', person: "loe" }] },
            { name: "lam", messages: [] },
            { name: "lsk", messages: [] },
            { name: "lkl", messages: [{ text: 'yo', person: "lkl" }] },
            { name: "ldl", messages: [] },
            { name: "lbh", messages: [] },
            { name: "lsb", messages: [] }]
        const game = [
            { gameImage: settingLogo, gameName: "CSGO", progress: 0 },
            { gameImage: settingLogo, gameName: "Minecraft", progress: 62 },
            { gameImage: settingLogo, gameName: "Chess", progress: 88 },
            { gameImage: settingLogo, gameName: "GTA5", progress: 12 },
            { gameImage: settingLogo, gameName: "Tower Defense", progress: 58 },
            { gameImage: settingLogo, gameName: "NorthGuard", progress: 34 },
            { gameImage: settingLogo, gameName: "Fall Guys", progress: 11 },
            { gameImage: settingLogo, gameName: "Call of Duty", progress: 96 },
            { gameImage: settingLogo, gameName: "Minion", progress: 100 }
        ]
        const addFriendUID = ""
        const searchGameName = ""

        const isAdmin = UserKeys.getCurrUserAdminStatus() == 'false' ? false : true
        const userName = UserKeys.getCurrUser()

        this.state = {
            friendList: friendList,
            game: game,
            showChat: false,
            chatName: "",
            friendMessages: [],
            addFriendUID: addFriendUID,
            searchGameName: searchGameName,
            friendListMessages: friendListMessages,
            isAdmin: isAdmin,
            userName: userName
        }
        this.showChatBox = this.showChatBox.bind(this)
        this.unShowChatBox = this.unShowChatBox.bind(this)
        this.onChangeFriendUID = this.onChangeFriendUID.bind(this)
        this.onSubmitFriendRequest = this.onSubmitFriendRequest.bind(this)
        this.onChangeGameSearch = this.onChangeGameSearch.bind(this)
        this.onSubmitGameSearch = this.onSubmitGameSearch.bind(this)
        this.onSendMessage = this.onSendMessage.bind(this)
        this.onClickGameRedirectAchivement = this.onClickGameRedirectAchivement.bind(this)
    }


    showChatBox(e) {
        e.preventDefault();
        let friendName = "";
        const target = e.target.className;
        if (target == 'friendName') {
            friendName = e.target.innerHTML
        } else if (target == 'friendLogo') {
            friendName = e.target.nextSibling.innerHTML
        } else {
            friendName = e.target.children[1].innerHTML
        }
        const chatMessage = this.state.friendListMessages.filter(i => {
            if (i.name === friendName) {
                return i
            }
        })[0].messages

        this.setState({ friendMessages: chatMessage })
        this.setState({ chatName: friendName })
        this.setState({ showChat: true })
    }

    unShowChatBox() {
        this.setState({ showChat: false })
    }

    //for sending message in Chat
    onSendMessage = (message) => {
        const messages = this.state.friendMessages
        messages.push({
            text: message,
            //Me will be the current user
            person: "Me"
        })
        this.setState({ friendMessages: messages })
    }



    onChangeFriendUID(e) {
        this.setState({ addFriendUID: e.target.value })
    }

    onSubmitFriendRequest(e) {
        e.preventDefault()
        this.setState({ addFriendUID: "" })
        alert("Friend UID does not exist")
    }

    onChangeGameSearch(e) {
        this.setState({ searchGameName: e.target.value })
    }

    onSubmitGameSearch(e) {
        e.preventDefault()
        this.setState({ searchGameName: "" })
    }

    onClickGameRedirectAchivement(e){
        const target = e.target
        let gameName;
        if(target.className == "gameContainer"){
            gameName = target.lastChild.lastChild.innerHTML;
        }else if (target.className == "gameBody" || target.className == "gameImage" || target.className == "vertical-row"){
            gameName = target.parentNode.lastChild.lastChild.innerHTML;
        }else if (target.className == "filledProgress"){
            gameName = target.parentNode.nextSibling.innerHTML;
        }else{
            gameName = target.parentNode.lastChild.innerHTML;
        }
        this.props.history.push({
            pathname: '/GameAchievements',
            state: { gameName: gameName }
          })
    }

    render() {
        return (
            <>
                <HeadContainer bgId={"dashboard"}>
                    <HeaderNavBar>
                        <HeaderImage to='/dashboard' src={logo} />
                        <div className='group'>
                            {this.state.isAdmin && (<HeaderButton path='/admin'>Admin</HeaderButton>)}
                            <HeaderButton path='/reviewForum'>Forum</HeaderButton>
                            <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                            <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
                            <HeaderButton path='/'>Log Out</HeaderButton>
                        </div>
                    </HeaderNavBar>
                </HeadContainer>
                <div className='dashboard'>
                    <div className='left'>
                        <BannerContainer>
                            <div className="bannerUserInfo">
                                <div id="bannerUserName">User Name: {this.state.userName}</div>
                                <div id="bannerUserUID">UID: 7024568</div>
                            </div>
                            <PersonalPic src={profilePic} />
                            <span className="bannerReputation">Reputation: 3</span>
                            <div className="bannerLeftLinkGroup">
                                <BannerLink path="https://discord.com">Discord</BannerLink>
                                <BannerLink path='https://twitter.com'>Twitter</BannerLink>
                                <BannerLink path='https://www.facebook.com'>Facebook</BannerLink>
                                <BannerLink path='https://store.steampowered.com'>Steam</BannerLink>
                            </div>
                        </BannerContainer>
                    </div>
                    <div className='middle'>
                        <form className="searchGame" onSubmit={e => this.onSubmitGameSearch(e)}>
                            <input
                                className="searchGameInput"
                                placeholder="Enter Specific Game"
                                value={this.state.searchGameName}
                                onChange={e => this.onChangeGameSearch(e)}
                            />
                        </form>
                        <AchievementContainer bodyId={'shrink'}>
                            {this.state.game.map((item, i) => {
                                if (item.gameName.toLowerCase().startsWith(this.state.searchGameName.toLowerCase())) {
                                    return( 
                                        <Game key={i} image={item.gameImage} redirect={this.onClickGameRedirectAchivement}>
                                            <span className="achivementProgress">{item.progress + '%'}</span>
                                            <ProgressBar completed={item.progress}/>
                                            <div className="gameInfo">{item.gameName}</div>
                                        </Game>
                                    )
                                }
                            })}
                        </AchievementContainer>
                    </div>
                    <div className='right'>
                        <BannerContainer>
                            <div className="rightBannerTitle">
                                <p className="rightBannerTitleName">Chat</p>
                                <form className="addFriendForm" onSubmit={e => this.onSubmitFriendRequest(e)}>
                                    <input
                                        className="addFriendInput"
                                        placeholder="Add Friend UID"
                                        value={this.state.addFriendUID}
                                        onChange={e => this.onChangeFriendUID(e)}
                                    />
                                    <button className="addFriendButton">Add</button>
                                </form>
                            </div>
                            <FriendList>
                                {this.state.friendList.map((item, i) => {
                                    return <Friend key={i} func={this.showChatBox}>{item}</Friend>
                                })}
                            </FriendList>
                        </BannerContainer>
                    </div>
                    {this.state.showChat &&
                        (<ChatBox
                            name={this.state.chatName}
                            messages={this.state.friendMessages}
                            onSendMessage={this.onSendMessage}
                            showChatOption={this.unShowChatBox} />)}
                </div>
            </>
        )
    }
}

export default withRouter (DashBoard);