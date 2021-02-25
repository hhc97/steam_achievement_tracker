import React from "react";
import {HeaderButton, HeaderImage, HeadContainer, HeaderNavBar} from '../HeaderComponent'
import logo from './../../logo.svg'
import settingLogo from './../Dashboard/Static/settingLogo.png'
import {PersonalPic, BannerContainer, BannerLink, Friend, FriendList} from '../PersonalBanner'
import {AchievementContainer, Game} from '../Achievement'
import ChatBox from '../ChatBox';
import {HeaderContainer} from '../../Containers'
import './style.css'

class DashBoard extends React.Component {
    constructor(props){
        super(props)
        const friendList = ["leo", 'lee','lao','loo','loe','lam','lsk','lkl','ldl','lbh','lsb']
        const game = [
            {gameImage: settingLogo, gameName: "CSGO"},
            {gameImage: settingLogo, gameName: "Minecraft"},
            {gameImage: settingLogo, gameName: "Chess"},
            {gameImage: settingLogo, gameName: "GTA5"},
            {gameImage: settingLogo, gameName: "Tower Defense"},
            {gameImage: settingLogo, gameName: "Tower Defense"},
            {gameImage: settingLogo, gameName: "Tower Defense"},
            {gameImage: settingLogo, gameName: "Tower Defense"},
            {gameImage: settingLogo, gameName: "Tower Defense"}
        ]
        this.state = {friendList:friendList, game:game, showChat: false, chatName:""}
        this.showChatBox = this.showChatBox.bind(this)
        this.unShowChatBox= this.unShowChatBox.bind(this)
    }

    showChatBox(e){
        e.preventDefault();
        let friendName = "";
        const target = e.target.className;
        if (target == 'friendName'){
            friendName = e.target.innerHTML
        }else if (target == 'friendLogo'){
            friendName = e.target.nextSibling.innerHTML
        }else{
            friendName = e.target.children[1].innerHTML
        }
        this.setState({chatName: friendName})
        this.setState({showChat: true})
    }

    unShowChatBox(){
        this.setState({showChat: false})
    }

    render() {
        return (
            <>
                <HeadContainer>
                    <HeaderNavBar>
                        <HeaderImage to='/' src={logo}/>
                        <div className='group'>
                            <HeaderButton path='/AccountSettings'>Setting</HeaderButton>
                            <HeaderButton path='/'>LogOut</HeaderButton>
                        </div>
                    </HeaderNavBar>
                </HeadContainer>
                <div className='dashboard'>
                    <div className='left'>
                        <BannerContainer>
                            <PersonalPic src={logo}/>
                            <BannerLink path="https://discord.com">Discord</BannerLink>
                            <BannerLink path='https://twitter.com'>Twitter</BannerLink>
                            <BannerLink path='https://www.facebook.com'>Facebook</BannerLink>
                            <BannerLink path='https://store.steampowered.com'>Steam</BannerLink>
                        </BannerContainer>
                    </div>
                    <div className='middle'>
                        <AchievementContainer>
                            {this.state.game.map((item,i) => {
                                return <Game key = {i} image={item.gameImage} gameName={item.gameName}/>
                            })}
                        </AchievementContainer>
                    </div>
                    <div className='right'>
                        <BannerContainer>
                            <FriendList>
                                {this.state.friendList.map((item,i) => {
                                    return <Friend key={i} func={this.showChatBox}>{item}</Friend>
                                })}
                            </FriendList>
                        </BannerContainer>
                    </div>
                    {this.state.showChat && (<ChatBox name={this.state.chatName} showChatOption={this.unShowChatBox}/>)}  
                </div>
            </>
        )
    }
}

export default DashBoard;