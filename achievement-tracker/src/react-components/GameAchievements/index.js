import React from 'react';

import { Redirect } from 'react-router-dom'
import {HeaderButton, HeaderImage, HeadContainer, HeaderNavBar} from '../HeaderComponent'
import logo from './../../logo.svg'
import profilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"

import settingLogo from './../Dashboard/Static/settingLogo.png'
import {PersonalPic, BannerContainer, BannerLink, Friend, FriendList} from '../PersonalBanner'
import {AchievementContainer, Game} from '../Achievement'
import './style.css';
import UserKeys from '../UserKeys';

const log = console.log

class GameAchievements extends React.Component {
    constructor(props){
      super(props)
      const gameName = this.props.location.state.gameName
      // game will be pull from database in phase2, now is hardcode
      const game = [
          {gameImage: settingLogo, gameName: "CSGO", 
            achievements:[
                {name: "Let's Play", achieve: "N"},
                {name: "Hide and Seek", achieve: "N"},
                {name: "Kill Three with a Grenade", achieve: "N"},
                {name: "200 kills", achieve: "N"},
                {name: "Hopping master", achieve: "N"},
                {name: "Knifer", achieve: "N"},
                {name: "Planting master", achieve: "N"},
                {name: "Supreme", achieve: "N"},
                {name: "Own 50 guns", achieve: "N"},
                {name: "Own 100 guns", achieve: "N"},
                {name: "Own 200 guns", achieve: "N"}]
            },
          {gameImage: settingLogo, gameName: "Minecraft",
            achievements:[
                {name: "Build a Block", achieve: "Y"},
                {name: "Die", achieve: "Y"},
                {name: "Slay the Dragon", achieve: "N"},
                {name: "Destory a bed", achieve: "N"},
                {name: "Curse of Lava", achieve: "Y"},
                {name: "Gold Digger", achieve: "Y"}]
            },
          {gameImage: settingLogo, gameName: "Chess",
            achievements:[
                {name: "Start with White", achieve: "N"},
                {name: "Start with Black", achieve: "Y"},
                {name: "Win one Match", achieve: "N"},
                {name: "3 Consecutive Win", achieve: "N"},
                {name: "5 Consecutive Win", achieve: "Y"},
                {name: "10 Consecutive Win", achieve: "N"},
                {name: "15 Consecutive Win", achieve: "Y"},
                {name: "20 Consecutive Win", achieve: "N"}]
            },
          {gameImage: settingLogo, gameName: "GTA5",
            achievements:[
                {name: "Steal a Car", achieve: "N"},
                {name: "Escape", achieve: "Y"},
                {name: "One Star Warrant", achieve: "Y"},
                {name: "Two Star Warrant", achieve: "N"},
                {name: "Three Star Warrant", achieve: "N"},
                {name: "Four Star Warrant", achieve: "N"},
                {name: "Five Star Warrant", achieve: "Y"},
                {name: "Own a Car", achieve: "Y"},
                {name: "Earn a Million", achieve: "N"},
                {name: "Tokyo Drift", achieve: "N"},
                {name: "Crash and Die", achieve: "N"}]
            },
          {gameImage: settingLogo, gameName: "Tower Defense",
            achievements:[
                {name: "Let's Play", achieve: "N"},
                {name: "Hide and Seek", achieve: "Y"},
                {name: "Kill Three with a Grenade", achieve: "N"},
                {name: "200 kills", achieve: "N"},
                {name: "Hopping master", achieve: "Y"},
                {name: "Knifer", achieve: "N"},
                {name: "Planting master", achieve: "Y"},
                {name: "Supreme", achieve: "N"},
                {name: "Own 50 guns", achieve: "N"},
                {name: "Own 100 guns", achieve: "N"},
                {name: "Own 200 guns", achieve: "N"}]
            },
          {gameImage: settingLogo, gameName: "NorthGuard",
            achievements:[
                {name: "Win a Match", achieve: "N"},
                {name: "Loss a Match", achieve: "Y"}]
            },
          {gameImage: settingLogo, gameName: "Fall Guys",
            achievements:[
                {name: "Number One", achieve: "Y"},
                {name: "Die Together", achieve: "Y"},
                {name: "Jump", achieve: "N"},
                {name: "10 Wins", achieve: "N"}]
            },
          {gameImage: settingLogo, gameName: "Call of Duty",
            achievements:[
                {name: "Wood", achieve: "Y"},
                {name: "Silver", achieve: "Y"},
                {name: "Gold", achieve: "Y"},
                {name: "Diamond", achieve: "N"},
                {name: "Hard-Diamond", achieve: "N"},
                {name: "Golden-Diamond", achieve: "N"},
                {name: "Master", achieve: "N"},
                {name: "Elite Master", achieve: "N"},
                {name: "Supreme", achieve: "N"},
                {name: "Global Supreme", achieve: "N"}]
            },
            
          {gameImage: settingLogo, gameName: "Minion",
            achievements:[
                {name: "Be a Minion", achieve: "Y"}]
            }
        ] 
      const gameObj = game.filter(i => i.gameName == gameName)[0]
      const searchAchievementName = ""
      const userName = localStorage.getItem(UserKeys.user)
      const isAdmin = localStorage.getItem(UserKeys.isAdmin) == "false" ? false : true

      this.state = {
          game:game, 
          searchAchievementName:searchAchievementName,
          gameName: gameName,
          gameObj: gameObj,
          userName: userName,
          isAdmin: isAdmin
      }
      this.onChangeGameSearch = this.onChangeGameSearch.bind(this)
      this.onSubmitGameSearch = this.onSubmitGameSearch.bind(this)
    }
    onChangeGameSearch(e){
      this.setState({searchAchievementName:e.target.value})
    }

    onSubmitGameSearch(e){
        e.preventDefault()
        this.setState({searchAchievementName:""})
    }

  render() {
    return (
        <>
          <HeadContainer bgId={"dashboard"}>
              <HeaderNavBar>
                  <HeaderImage to='/dashboard' src={logo}/>
                  <div className='group'>
                      {this.state.isAdmin && (<HeaderButton path='/admin'>Admin</HeaderButton>)}
                      <HeaderButton path='/reviewForum'>Forum</HeaderButton>
                      <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                      <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
                      <HeaderButton path='/'>LogOut</HeaderButton>
                  </div>
              </HeaderNavBar>
          </HeadContainer>
          <div className='gameAchivementBody'>
              <div className='gameAchivementBodyLeft'>
                  <BannerContainer>
                      <div className="bannerUserInfo">
                          <div id="bannerUserName">User Name: {this.state.userName}</div>
                          <div id="bannerUserUID">UID: 7024568</div>
                      </div>
                      <PersonalPic src={profilePic}/>
                      <span className="bannerReputation">Reputation: 3</span>
                      <div className="bannerLeftLinkGroup">
                          <BannerLink path="https://discord.com">Discord</BannerLink>
                          <BannerLink path='https://twitter.com'>Twitter</BannerLink>
                          <BannerLink path='https://www.facebook.com'>Facebook</BannerLink>
                          <BannerLink path='https://store.steampowered.com'>Steam</BannerLink>
                      </div>
                  </BannerContainer>
              </div>
              <div className='gameAchivementBodyMiddle'>
                  <p style={{color:"white"}}>{this.state.gameName}</p>
                  <form className="searchGame" onSubmit={e=>this.onSubmitGameSearch(e)}>
                          <input
                              className="searchGameInput"
                              placeholder="Enter Specific Achievement"
                              value= {this.state.searchGameName}
                              onChange={e=>this.onChangeGameSearch(e)}
                          />
                  </form>
                  <AchievementContainer bodyId={"fullLength"}>
                      {this.state.gameObj.achievements.map((item,i) => {
                          if (item.name.toLowerCase().startsWith(this.state.searchAchievementName.toLowerCase())){
                              let isAchievedBg = "#525252";
                              let opac;
                              if (item.achieve == "N"){
                                opac = "0.4"
                              }else{
                                opac = "1"
                              }
                              return (
                                <Game key = {i} image={this.state.gameObj.gameImage} isAchievedBg={isAchievedBg} opac = {opac}>
                                    <div className="AchievementName">{item.name}</div>
                                </Game>
                            )
                          }
                      })}
                  </AchievementContainer>
              </div>
            </div>
        </>
    )
  }
}

export default GameAchievements;
