import React from "react"
import { uid } from "react-uid"

import sampleProfilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import logo from './../../steamIcon2.png'
import loadingIcon from "./../Dashboard/Static/loadingSign.png"

import { HeaderButton, CurrentHeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import { logout } from '../../actions/reactAuth'
import { getGameStats, getAchievementStats } from '../../actions/steamHelpers'
import { getUserReviews } from '../../actions/review'
import { getReputation, updateReputation } from '../../actions/reputation'
import { updateUsernameReputation } from '../../actions/review'
import { getImage } from '../../actions/profilePic'

import "./Analytics.css"

const prettyMilliseconds = require('pretty-ms');

// All of the statistics listed on this page, both in the banner and in the below table, are hardcoded sample values.
// In phase 2, we will use API calls to populate this part of the user's profile with the relevant statistics we pull.

class Analytics extends React.Component {
    constructor(props) {
        super(props)
        const stats = [
            { id: 0, title: "Loading Game Info...", unlocked: 0, total: 0, playtime: 0, completion: NaN }
        ]
        const userName = this.props.app.state.currentUser

        this.state = {
            userName: userName,
            stats: stats,
            statsShown: [],
            userReviews: [],
            numReviews: 0,
            reviewScore: 0,
            reputation: 1,
            totalAchievements: 0,
            averageCompletion: 0,
            totalPlaytime: 0,
            averagePlaytime: 0,
            gamesOwned: 0,
            totalGames: 0,
            gamesAttempted: 0,
            gamesProcessed: 0,
            showLoading: true,
            sortAscending: false,
            joinDate: '',
            image: ""
        }
    }

    onSortDown(column) {
        if (this.state.sortAscending) {
            this.setState({ sortAscending: false })
            this.onSortUp(column)
            return
        }
        this.setState({ sortAscending: true })
        let stats = this.state.statsShown
        stats.sort((a, b) => {
            if (typeof (a[column]) !== typeof (b[column])) {
                return typeof (a[column]) == 'string' ? 1 : -1
            }
            if (typeof (a[column]) == "string") {
                return (a[column].localeCompare(b[column]))
            }
            return (a[column] - b[column])
        })
        this.setState({
            stats: stats
        })
    }

    onSortUp(column) {
        let stats = this.state.statsShown
        stats.sort((a, b) => {
            if (typeof (a[column]) !== typeof (b[column])) {
                return typeof (a[column]) == 'string' ? 1 : -1
            }
            if (typeof (a[column]) == "string") {
                return (b[column].localeCompare(a[column]))
            }
            return (b[column] - a[column])
        })
        this.setState({
            stats: stats
        })
    }

    calculateReputation() {
        const completion = this.state.averageCompletion
        const achievements = this.state.totalAchievements
        const playtime = this.state.totalPlaytime
        const reviewScore = this.state.reviewScore
        const gamesOwned = this.state.totalGames
        let completionComponent
        let achievementMultiplier
        let playtimeComponent
        let reviewComponent
        let gameComponent
        if (completion > 90) {
            completionComponent = 3
        } else {
            completionComponent = completion / 30
        }

        if (achievements > 2000) {
            achievementMultiplier = 1
        } else {
            achievementMultiplier = achievements / 2000
        }

        if (playtime > 5000) {
            playtimeComponent = 2
        } else {
            playtimeComponent = playtime / 2500
        }

        if (reviewScore > 100) {
            reviewComponent = 3
        } else {
            reviewComponent = reviewScore / 30
        }

        if (gamesOwned > 100) {
            gameComponent = 2
        } else {
            gameComponent = gamesOwned / 50
        }
        const rawReputation = achievementMultiplier * completionComponent
            + playtimeComponent
            + reviewComponent
            + gameComponent
        const reputation = Math.floor(rawReputation)
        this.setState({ reputation: reputation })
        updateReputation(this, reputation)
        updateUsernameReputation(this.state.userName, reputation, false)
        return reputation
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
        completion = (achieved / max) * 100
        return [achieved, max, completion]
    }

    updateBannerStats() {
        const tableStats = this.state.stats
        let totalAchievements = 0
        let totalPlaytime = 0
        let totalCompletion = 0
        let numGames = 0
        let gamesWithAchievement = 0
        for (let i = 0; i < tableStats.length; i++) {
            const game = tableStats[i];
            if (game.completion > 0) {
                totalAchievements += game.unlocked
                totalCompletion += game.completion
                numGames++
            }
            if (typeof (game.completion) !== 'string') {
                gamesWithAchievement++
            }
            totalPlaytime += game.playtime
        }
        this.setState({ totalGames: gamesWithAchievement })
        this.setState({ gamesAttempted: numGames })
        this.setState({ totalAchievements: totalAchievements })
        this.setState({ totalPlaytime: totalPlaytime })
        this.setState({ averagePlaytime: (totalPlaytime / tableStats.filter(game => game.playtime > 0.1).length) })
        if (numGames > 0) {
            this.setState({ averageCompletion: (totalCompletion / numGames) })
        }
    }

    async updateAsync(game) {
        let gameStats = -1
        await getAchievementStats(game.id)
            .then(res => { gameStats = this.extractStats(res) })
        if (gameStats === -1) {
            game.unlocked = '-'
            game.total = '-'
            game.completion = '-'
        } else {
            game.unlocked = gameStats[0]
            game.total = gameStats[1]
            game.completion = gameStats[2]
            this.setState({ totalGames: this.state.totalGames + 1 })
            this.setState({ totalAchievements: this.state.totalAchievements + gameStats[0] })
            if (gameStats[2] > 0) {
                this.setState({ gamesAttempted: this.state.gamesAttempted + 1 })
            }
        }
        this.setState({ gamesProcessed: this.state.gamesProcessed + 1 })
    }

    async updateAchievements() {
        let gameList = this.state.stats
        this.setState({ statsShown: gameList.slice() })
        const step = 6
        for (let i = 0; i < gameList.length; i += step) {
            this.updateBannerStats()
            await Promise.all(gameList.slice(i, i + step).map(game => this.updateAsync(game)))
        }
        this.updateBannerStats()
        this.setState({ showLoading: false })
        this.calculateReputation()
    }

    updateStats(data) {
        let gameList = []
        const games = data.games
        for (let i = 0; i < games.length; i++) {
            let gameEntry = {}
            const game = games[i]
            gameEntry['title'] = game.name
            gameEntry['unlocked'] = 'Calculating...'
            gameEntry['total'] = 'Calculating...'
            gameEntry['completion'] = 'Calculating...'
            gameEntry['playtime'] = game.playtime_forever / 60
            gameEntry['id'] = game.appid
            gameList.push(gameEntry)
            this.setState({ stats: gameList })
        }
        this.setState({ gamesOwned: gameList.length })
        this.setState({ stats: gameList })
        this.updateAchievements()
    }

    getReviewStats(data) {
        const reviews = data
        let numReviews = reviews.length
        let score = 0
        for (let i = 0; i < reviews.length; i++) {
            score += reviews[i].upvotes
            score -= reviews[i].downvotes
        }
        this.setState({ userReviews: reviews })
        this.setState({ numReviews: numReviews })
        this.setState({ reviewScore: score })
    }


    // sets the user membership length to a human readable string
    async setMemberAge() {
        let joined
        await fetch(`/users/joindate/${this.state.userName}`)
            .then(res => { return res.json() })
            .then(json => { joined = json.time })
        const now = new Date()
        const joinedDate = new Date(joined)
        const age_ms = now.getTime() - joinedDate.getTime()
        const ageString = prettyMilliseconds(age_ms) + '  '
        const stopPoint = ageString.split(' ', 2).join(' ').length
        this.setState({ joinDate: 'Member for ' + ageString.slice(0, stopPoint) })
    }

    async componentDidMount() {
        this.setMemberAge()
        getGameStats()
            .then(res => { this.updateStats(res) })
        await getUserReviews(this, this.state.userName)
            .then(res => { this.getReviewStats(res) })
        getReputation(this)
        getImage(this.state.userName, this)
    }

    render() {
        return (
            <div id="AnalyticsPage">

                <div id="HeaderSection">
                    <HeadContainer bgId={"dashboard"}>
                        <HeaderNavBar>
                            <HeaderImage to="/dashboard" src={logo}></HeaderImage>
                            <div className='group'>
                                <HeaderButton path='/Dashboard'>Dashboard</HeaderButton>
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                                <CurrentHeaderButton path='/Analytics'>Analytics</CurrentHeaderButton>
                                <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
                                <HeaderButton path='/' logoutFunc={() => { logout(this.props.app) }}>Log Out</HeaderButton>
                            </div>
                        </HeaderNavBar>
                    </HeadContainer>
                </div>

                <div id="BodySection">
                    <div id="TitleSection">
                        <h1>Analytics</h1>
                    </div>

                    <div id="StatsSection">
                        <div id="StatsHeader">
                            <div id="StatsUser">
                                {this.state.image === "" ?
                                    <img id="StatsProfilePic" src={sampleProfilePic} /> :
                                    <img id="StatsProfilePic" src={"data:image/png;base64," + this.state.image} />
                                }
                                <div id="StatsUserCaption">
                                    <p> {this.state.userName} </p>
                                    <span> {this.state.joinDate} </span>
                                </div>
                            </div>
                            <div id="StatsReputation">
                                <p>Reputation Level:</p>
                                <div id="ReputationContainer">
                                    {!(this.state.showLoading) || <div id="loadingIcon1">
                                        <img src={loadingIcon} />
                                    </div>}
                                    <span> {this.state.reputation} </span>
                                </div>
                            </div>
                        </div>

                        <div className="StatsRow" id="StatsRow1">
                            <div className="StatBoxLeft">
                                <p>Total Achievements</p>
                                <span> {this.state.totalAchievements} </span>
                            </div>
                            <div className="StatBoxCenter">
                                <p>Total Playtime</p>
                                <span> {(Math.round(this.state.totalPlaytime * 100) / 100).toFixed(2)} hours </span>
                            </div>
                            <div className="StatBoxRight">
                                <p>Reviews Posted</p>
                                <span> {this.state.numReviews} </span>
                            </div>
                        </div>

                        <div className="StatsRow" id="StatsRow2">
                            <div className="StatBoxLeft">
                                <p>Average Completion</p>
                                <span> {(Math.round(this.state.averageCompletion * 100) / 100).toFixed(2)} % </span>
                            </div>
                            <div className="StatBoxCenter">
                                <p>Average Playtime</p>
                                <span> {(Math.round(this.state.averagePlaytime * 100) / 100).toFixed(2)} hours </span>
                            </div>
                            <div className="StatBoxRight">
                                <p>Review Score</p>
                                <span> {this.state.reviewScore} </span>
                            </div>
                        </div>
                    </div>

                    <div id="TableSection">
                        <div id="StatsTitle">
                            <p>Lifetime Stats</p>
                            {!(this.state.showLoading) || <div id="loadingIcon2">
                                <img src={loadingIcon} />
                            </div>}
                        </div>
                        <div id="TotalStats">
                            <p> Total Games Attempted: {this.state.gamesAttempted} </p>
                            <p> Total Games Supporting Achievements: {this.state.totalGames} (from a total of {this.state.gamesOwned} games owned) </p>
                            {!(this.state.showLoading) || <p> Progress: processed {this.state.gamesProcessed} games out of {this.state.gamesOwned} </p>}
                        </div>
                        <table id="StatsTable">
                            <thead >
                                <tr>
                                    <th id="tableID" className="tableHeader">ID
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("id")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                    <th id="tableTitle" className="tableHeader">Title
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("title")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                    <th id="tableCompletion" className="tableHeader">Completion %
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("completion")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                    <th id="tableUnlocked" className="tableHeader">Unlocked
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("unlocked")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                    <th id="tableTotal" className="tableHeader">Total
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("total")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                    <th id="tablePlaytime" className="tableHeader">Playtime
                                        <div className="sort">
                                            <button className="sortButton" onClick={() => this.onSortDown("playtime")}>
                                                <span>{this.state.sortAscending ? '▲' : '▼'}</span></button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.statsShown.map(row => (
                                        <tr key={uid(row)}>
                                            <td className="tableCell">{row.id}</td>
                                            <td className="tableCell">{row.title}</td>
                                            <td className="tableCell">{typeof row.completion == 'string' ? row.completion :
                                                (Math.round(row.completion * 100) / 100).toFixed(2)} </td>
                                            <td className="tableCell">{row.unlocked}</td>
                                            <td className="tableCell">{row.total}</td>
                                            <td className="tableCell">{(row.playtime).toFixed(2)} h </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    <br></br>
                </div>
            </div>
        )
    }
}

export default Analytics;