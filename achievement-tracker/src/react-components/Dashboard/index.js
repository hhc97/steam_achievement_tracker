import React from "react";
import { HeaderButton, HeaderImage, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import logo from './../../logo.svg'
import profilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import settingLogo from "./../Dashboard/Static/settingLogo.png"
import loadingIcon from "./../Dashboard/Static/loading.jpg"
import { PersonalPic, BannerContainer, BannerLink, Friend, FriendList } from '../PersonalBanner'
import { AchievementContainer, Game } from '../Achievement'
import ChatBox from '../ChatBox';
import ProgressBar from '../Achievement/ProgressBar'
import { withRouter } from 'react-router-dom'
import { logout } from '../../actions/reactAuth'
import { getFriend, addFriends, deleteFriend } from '../../actions/friend'
import './style.css'
import { getReputation } from "../../actions/reputation";
import { getGameStats, getAchievementStats } from '../../actions/steamHelpers'



class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        const friendList = []
        const game = [
            { gameImage: settingLogo, gameName: "Loading Game Data...", progress: "NaN", gameId: "" },
        ]
        const addFriendName = ""
        const searchGameName = ""

        // const isAdmin = UserKeys.getCurrUserAdminStatus() == 'false' ? false : true
        const userName = this.props.app.state.currentUser

        this.state = {
            friendList: friendList,
            game: game,
            showChat: false,
            chatName: "",
            addFriendName: addFriendName,
            searchGameName: searchGameName,
            // isAdmin: isAdmin,
            userName: userName,
            reputation: 0,
        }
        this.showChatBox = this.showChatBox.bind(this)
        this.unShowChatBox = this.unShowChatBox.bind(this)
        this.onChangeFriendUID = this.onChangeFriendUID.bind(this)
        this.onSubmitFriendRequest = this.onSubmitFriendRequest.bind(this)
        this.onChangeGameSearch = this.onChangeGameSearch.bind(this)
        this.onSubmitGameSearch = this.onSubmitGameSearch.bind(this)
        this.onClickGameRedirectAchivement = this.onClickGameRedirectAchivement.bind(this)
        this.deleteFromFriend = this.deleteFromFriend.bind(this)
    }

    extractStats(data) {
        let completion = -1
        if (data.achievements === undefined) {
            return completion
        }
        const max = data.achievements.length
        let achieved = 0
        for (let i = 0; i < max; i++) {
            const element = data.achievements[i];
            if (element.achieved === 1) {
                achieved++
            }
        }
        completion = Math.floor((achieved / max) * 100)
        return completion
    }

    // updates games for current user
    updateGames = async (data) => {
        let gameList = []
        const baseimgURL = 'http://media.steampowered.com/steamcommunity/public/images/apps/'
        const games = data.games
        for (let i = 0; i < games.length; i++) {
            let gameEntry = {}
            const game = games[i]
            // check game for completion
            let completion = -1
            await getAchievementStats(game.appid)
                .then(res => { completion = this.extractStats(res) })
            if (completion < 0) {
                // if no completion, then don't show game
                continue
            }
            gameEntry['gameName'] = game.name
            gameEntry['progress'] = completion
            gameEntry['gameImage'] = `${baseimgURL}${game.appid}/${game.img_icon_url}.jpg`
            gameEntry['gameId'] = game.appid
            gameList.push(gameEntry)
            this.setState({ game: gameList })
        }
        this.setState({ game: gameList })
        document.getElementById("loadingIcon").style.display = "none"
    }

    componentDidMount() {
        getFriend(this)
        getReputation(this)
        getGameStats()
            .then(res => {
                this.setState({ gameStats: res })
                this.updateGames(res)
            })
    }

    showChatBox(e) {
        e.preventDefault();
        let friendName = "";
        let target = e.target;
        if (target.tagName === "path"){
            target = target.parentNode
        }
        if (target.tagName === "svg"){
            if (target.className.baseVal === "deleteFriend"){
                return;
            }
        }
        let parent = e.target
        while (parent.className !== "friendContainer"){
            parent = parent.parentNode
        }
        friendName = parent.children[0].children[1].innerHTML
        this.setState({ chatName: friendName })
        this.setState({ showChat: true })
    }

    unShowChatBox() {
        this.setState({ showChat: false })
    }

    deleteFromFriend(e){
        let parent = e.target
        if (parent.tagName === "path"){
            parent = parent.parentNode
        }
        if (parent.tagName === "svg"){
            parent = parent.parentNode
        }
        const friendName = parent.children[0].children[1].innerHTML
        deleteFriend(this, friendName)
    }

    onChangeFriendUID(e) {
        this.setState({ addFriendName: e.target.value })
    }

    async onSubmitFriendRequest(e) {
        e.preventDefault()
        try {
            await addFriends(this)
            this.setState({ addFriendName: "" })
        } catch (error) {
            console.log(error)
        }

    }

    onChangeGameSearch(e) {
        this.setState({ searchGameName: e.target.value })
    }

    onSubmitGameSearch(e) {
        e.preventDefault()
        this.setState({ searchGameName: "" })
    }

    onClickGameRedirectAchivement(e) {
        const target = e.target
        let gameName;
        if (target.className == "gameContainer") {
            gameName = target.lastChild.lastChild.innerHTML;
        } else if (target.className == "gameBody" || target.className == "gameImage" || target.className == "vertical-row") {
            gameName = target.parentNode.lastChild.lastChild.innerHTML;
        } else if (target.className == "filledProgress") {
            gameName = target.parentNode.nextSibling.innerHTML;
        } else {
            gameName = target.parentNode.lastChild.innerHTML;
        }
        const gameId = this.state.game.filter((i) => { return i.gameName === gameName })[0].gameId
        this.props.history.push({
            pathname: '/GameAchievements',
            state: {
                gameName: gameName,
                userName: this.state.userName,
                reputation: this.state.reputation,
                gameId: gameId
            }
        })
    }

    render() {
        return (
            <>
                <HeadContainer bgId={"dashboard"}>
                    <HeaderNavBar>
                        <HeaderImage to='/dashboard' src={logo} />
                        <div className='group'>
                            {/* {this.state.isAdmin && (<HeaderButton path='/admin'>Admin</HeaderButton>)} */}
                            <HeaderButton path='/reviewForum'>Forum</HeaderButton>
                            <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                            <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
                            <HeaderButton path='/' logoutFunc={() => { logout(this.props.app) }}>Log Out</HeaderButton>
                        </div>
                    </HeaderNavBar>
                </HeadContainer>
                <div className='dashboard'>
                    <div className='left'>
                        <BannerContainer>
                            <div className="bannerUserInfo">
                                <div id="bannerUserName">User Name: {this.state.userName}</div>
                            </div>
                            <PersonalPic src={profilePic} />
                            <span className="bannerReputation">Reputation: {this.state.reputation}</span>
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
                                placeholder="Search for a Game..."
                                value={this.state.searchGameName}
                                onChange={e => this.onChangeGameSearch(e)}
                            />
                        </form>
                        <AchievementContainer bodyId={'shrink'}>
                            {this.state.game.map((item, i) => {
                                if (item.gameName.toLowerCase().startsWith(this.state.searchGameName.toLowerCase())) {
                                    return (
                                        <Game key={i} image={item.gameImage} redirect={this.onClickGameRedirectAchivement}>
                                            <span className="achivementProgress">{item.progress + '%'}</span>
                                            <ProgressBar completed={item.progress} />
                                            <div className="gameInfo">{item.gameName}</div>
                                        </Game>
                                    )
                                }
                            })}
                        </AchievementContainer>
                        <div id="loadingIcon">
                            <img src={loadingIcon} />
                        </div>
                    </div>
                    <div className='right'>
                        <BannerContainer>
                            <div className="rightBannerTitle">
                                <p className="rightBannerTitleName">Chat</p>
                                <form className="addFriendForm" onSubmit={e => this.onSubmitFriendRequest(e)}>
                                    <input
                                        className="addFriendInput"
                                        placeholder="Add Friend Name"
                                        value={this.state.addFriendName}
                                        onChange={e => this.onChangeFriendUID(e)}
                                    />
                                    <button className="addFriendButton">Add</button>
                                </form>
                            </div>
                            <FriendList>
                                {this.state.friendList.map((item, i) => {
                                    return <Friend key={i} chat={this.showChatBox} deleteFriend={this.deleteFromFriend}>{item}</Friend>
                                })}
                            </FriendList>
                        </BannerContainer>
                    </div>
                    {this.state.showChat &&
                        (<ChatBox
                            userName={this.state.userName}
                            friendName={this.state.chatName}
                            showChatOption={this.unShowChatBox} />)}
                </div>
            </>
        )
    }
}

export default withRouter(DashBoard);