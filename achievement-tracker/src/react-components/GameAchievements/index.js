import React from 'react';

import { CurrentHeaderButton, HeaderButton, HeaderImage, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import logo from './../../steamIcon2.png'
import profilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import { logout } from '../../actions/reactAuth'
import { PersonalPic, BannerContainer, BannerLink } from '../PersonalBanner'
import { AchievementContainer, Game } from '../Achievement'
import './style.css';
import { getImage } from '../../actions/profilePic'
import { getAchievementStats, getGameSchema } from '../../actions/steamHelpers'
const dateFormat = require('dateformat');

class GameAchievements extends React.Component {
  constructor(props) {
    super(props)

    let gameName = ""
    let userName = ""
    let reputation = 0
    let gameId = ""



    if (this.props.location.state === undefined) {
      this.props.history.push('/dashboard')
    } else {
      gameName = this.props.location.state.gameName
      userName = this.props.location.state.userName
      reputation = this.props.location.state.reputation
      gameId = this.props.location.state.gameId
    }


    const achievementsList = []
    const searchAchievementName = ""

    this.state = {
      searchAchievementName: searchAchievementName,
      gameName: gameName,
      userName: userName,
      reputation: reputation,
      gameId: gameId,
      achievementsList: achievementsList,
      image: ""
    }
    this.onChangeGameSearch = this.onChangeGameSearch.bind(this)
    this.onSubmitGameSearch = this.onSubmitGameSearch.bind(this)
    this.getStats = this.getStats.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.getStats(this.state.gameId)
    }
    getImage(this.state.userName, this)
  }

  async getStats(id) {
    const achievementsList = []
    const data = await getAchievementStats(id)
    const apiAchievement = await getGameSchema(id)
    const achievements = data.achievements
    for (let i = 0; i < achievements.length; i++) {
      const obj = {}
      const key = achievements[i].apiname
      obj.image = apiAchievement[key].icon
      obj.name = apiAchievement[key].displayName
      obj.achieved = achievements[i].achieved
      if (achievements[i].unlocktime === 0) {
        obj.achievedTime = "N/A"
      } else {
        const date = new Date(achievements[i].unlocktime * 1000)
        obj.achievedTime = dateFormat(date, "dd/mm/yyyy hh:MM:ss tt")
      }
      achievementsList.push(obj)
    }
    this.setState({ achievementsList: achievementsList })
  }

  onChangeGameSearch(e) {
    this.setState({ searchAchievementName: e.target.value })
  }

  onSubmitGameSearch(e) {
    e.preventDefault()
    this.setState({ searchAchievementName: "" })
  }

  render() {
    return (
      <>
        <HeadContainer bgId={"dashboard"}>
          <HeaderNavBar>
            <HeaderImage to='/dashboard' src={logo} />
            <div className='group'>
              {/* {this.state.isAdmin && (<HeaderButton path='/admin'>Admin</HeaderButton>)} */}
              <CurrentHeaderButton path='/Dashboard'>Dashboard</CurrentHeaderButton>
              <HeaderButton path='/reviewForum'>Forum</HeaderButton>
              <HeaderButton path='/Analytics'>Analytics</HeaderButton>
              <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
              <HeaderButton path='/' logoutFunc={() => { logout(this.props.app) }}>Log Out</HeaderButton>
            </div>
          </HeaderNavBar>
        </HeadContainer>
        <div className='gameAchivementBody'>
          <div className='gameAchivementBodyLeft'>
            <BannerContainer>
              <div className="bannerUserInfo">
                <div id="bannerUserName">User Name: {this.state.userName}</div>
              </div>
              {this.state.image === "" ?
                <PersonalPic src={profilePic} /> :
                <PersonalPic src={"data:image/png;base64," + this.state.image} />
              }
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
            <p style={{ color: "white" }}>{this.state.gameName}</p>
            <form className="searchGame" onSubmit={e => this.onSubmitGameSearch(e)}>
              <input
                className="searchGameInput"
                placeholder="Search for an Achievement..."
                value={this.state.searchGameName}
                onChange={e => this.onChangeGameSearch(e)}
              />
            </form>
            <AchievementContainer bodyId={"fullLength"}>
              {this.state.achievementsList.map((item, i) => {
                if (item.name.toLowerCase().startsWith(this.state.searchAchievementName.toLowerCase())) {
                  let isAchievedBg = "#525252";
                  let opac;
                  if (item.achieved == 0) {
                    opac = "0.4"
                  } else {
                    opac = "1"
                  }
                  return (
                    <Game key={i} image={item.image} isAchievedBg={isAchievedBg} opac={opac}>
                      <div className="AchievementName">{item.name}</div>
                      <div className="AchievedTime">{item.achievedTime}</div>
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
