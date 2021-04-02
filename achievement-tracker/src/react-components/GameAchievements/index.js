import React from 'react';

import {HeaderButton, HeaderImage, HeadContainer, HeaderNavBar} from '../HeaderComponent'
import logo from './../../logo.svg'
import profilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"

import {PersonalPic, BannerContainer, BannerLink} from '../PersonalBanner'
import {AchievementContainer, Game} from '../Achievement'
import './style.css';
import { getAchievementStats, getGameSchema } from '../../actions/steamHelpers'


class GameAchievements extends React.Component {
    constructor(props){
      super(props)
      const gameName = this.props.location.state.gameName
      const userName = this.props.location.state.userName
      const reputation = this.props.location.state.reputation
      const gameId = this.props.location.state.gameId
      const achievementsList = []
      const searchAchievementName = ""

      this.state = {
          searchAchievementName:searchAchievementName,
          gameName: gameName,
          userName: userName,
          reputation: reputation,
          gameId: gameId,
          achievementsList: achievementsList
      }
      this.onChangeGameSearch = this.onChangeGameSearch.bind(this)
      this.onSubmitGameSearch = this.onSubmitGameSearch.bind(this)
      this.getStats = this.getStats.bind(this)
    }

    componentDidMount(){
      this.getStats(this.state.gameId)
    }

    async getStats(id){
      const achievementsList = []
      const data = await getAchievementStats(id)
      const apiAchievement = await getGameSchema(id)
      const achievements = data.achievements
      for (let i =0; i < achievements.length; i++){
        const obj = {}
        const key = achievements[i].apiname
        obj.image = apiAchievement[key].icon
        obj.name = apiAchievement[key].displayName
        obj.achieved = achievements[i].achieved
        achievementsList.push(obj)
      }
      this.setState({achievementsList: achievementsList})
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
                      {/* {this.state.isAdmin && (<HeaderButton path='/admin'>Admin</HeaderButton>)} */}
                      <HeaderButton path='/dashboard'>Dashboard</HeaderButton>
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
                      </div>
                      <PersonalPic src={profilePic}/>
                      <span className="bannerReputation">Reputation: {this.state.reputation}</span>
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
                      {this.state.achievementsList.map((item,i) => {
                          if (item.name.toLowerCase().startsWith(this.state.searchAchievementName.toLowerCase())){
                              let isAchievedBg = "#525252";
                              let opac;
                              if (item.achieved == 0){
                                opac = "0.4"
                              }else{
                                opac = "1"
                              }
                              return (
                                <Game key = {i} image={item.image} isAchievedBg={isAchievedBg} opac = {opac}>
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
