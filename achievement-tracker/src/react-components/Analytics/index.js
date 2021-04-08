import React from "react"
import { uid } from "react-uid"

import sampleProfilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import logo from './../../logo.svg'
import loadingIcon from "./../Dashboard/Static/loading.jpg"

import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'
import { logout } from '../../actions/reactAuth'
import { getGameStats, getAchievementStats } from '../../actions/steamHelpers'

import "./Analytics.css"

// All of the statistics listed on this page, both in the banner and in the below table, are hardcoded sample values.
// In phase 2, we will use API calls to populate this part of the user's profile with the relevant statistics we pull.

class Analytics extends React.Component {
    constructor(props) {
        super(props)
        const stats = [
            { id: 0, title: "Loading Game Info...", unlocked: 0, total: 0, playtime: 0, completion: NaN }
        ]
        const username = this.props.app.state.currentUser

        this.state = {
            username: username,
            stats: stats,
            statsShown: [],
            reputation: 1,
            totalAchievements: 0,
            averageCompletion: 0,
            totalPlaytime: 0,
            averagePlaytime: 0,
            totalGames: 0,
            showLoading: true,
            sortAscending: false,
            joinDate: ''
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
        for (let i = 0; i < tableStats.length; i++) {
            const game = tableStats[i];
            if (game.completion > 0) {
                totalAchievements += game.unlocked
                totalCompletion += game.completion
                totalPlaytime += game.playtime
                numGames++
            }
        }
        this.setState({ totalAchievements: totalAchievements })
        this.setState({ averageCompletion: (totalCompletion / numGames) })
        this.setState({ totalPlaytime: totalPlaytime })
        this.setState({ averagePlaytime: (totalPlaytime / numGames) })
    }

    async updateAchievements() {
        let gameList = this.state.stats
        this.setState({ statsShown: gameList.slice() })
        for (let i = 0; i < gameList.length; i++) {
            const game = gameList[i];
            let gameStats = -1
            await getAchievementStats(game.id)
                .then(res => { gameStats = this.extractStats(res) })
            if (gameStats === -1) {
                gameList.splice(i, 1)
                i--
                let shownStats = this.state.statsShown
                const removeIndex = shownStats.indexOf(game);
                if (removeIndex > -1) {
                    shownStats.splice(removeIndex, 1);
                }
            } else {
                game.unlocked = gameStats[0]
                game.total = gameStats[1]
                game.completion = gameStats[2]
                this.updateBannerStats()
            }
        }
        this.setState({ showLoading: false })
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
        this.setState({ stats: gameList })
        this.updateAchievements()
    }

    async setMemberAge() {
        let joined
        await fetch(`/users/joindate/${this.state.username}`)
            .then(res => { return res.json() })
            .then(json => { joined = json.time })
        let joinedDate = new Date(joined)
        let today = new Date()
        let ageSeconds = (today.getTime() - joinedDate.getTime()) /1000
        let age
        // if age of account is less than 1 day, report age in hours and minutes
        if (ageSeconds < 86400) {
            let ageHours = Math.floor(ageSeconds/3600)
            let ageMinutes = Math.floor(ageSeconds/60 - ageHours*60)
            // display plural 'hours' if age > 2h
            age = `${ageHours} hour${ageHours > 1 ? "s":""} ${ageMinutes} minute${ageMinutes > 1 ? "s":""}`
        // if age is greater than 1 day but under 1 month, report age in days
        } else if (ageSeconds/86400 < 30) {
            // display plural 'days' if age > 2 days
            age = `${Math.floor(ageSeconds/86400)} day${ageSeconds > 86400*2 ? "s":""}`
        // if age is greater than 1 month but under 1 year, report age in months
        } else if (ageSeconds/86400 < 365) {
            // display plural 'months' if age > 2 months
            let ageMonths = Math.floor((ageSeconds/86400)/30)
            let ageDays = Math.floor(ageSeconds/86400 - ageMonths*30)
            age = `${Math.floor((ageSeconds/86400)/30)} month${ageSeconds > 86400*60 ? "s":""} day${ageDays > 1 ? "s":""}`
        // if age is greater than 1 year, report age in years and months
        } else {
            let ageYears = Math.floor((ageSeconds/86400)/365)
            let ageMonths = Math.floor((ageSeconds/86400 - ageYears*365)/30)
            age = `${ageYears} year${ageYears > 1 ? "s":""} ${ageMonths} month${ageMonths > 1 ? "s":""}`
        }
        this.setState({ joinDate: "Member for " + age})
    }

    componentDidMount() {
        this.setMemberAge()
        getGameStats()
            .then(res => { this.updateStats(res) })
    }

    render() {
        return (
            <div id="AnalyticsPage">

                <div id="HeaderSection">
                    <HeadContainer bgId={"dashboard"}>
                        <HeaderNavBar>
                            <HeaderImage to="/dashboard" src={logo}></HeaderImage>
                            <div className='group'>
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
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
                                <img id="StatsProfilePic" src={sampleProfilePic}></img>
                                <div id="StatsUserCaption">
                                    <p> {this.state.username} </p>
                                    <span> {this.state.joinDate} </span>
                                </div>
                            </div>
                            <div id="StatsReputation">
                                <p>Reputation Level:</p>
                                <span> 3 </span>
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
                                <span> 42 </span>
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
                                <span> 762 </span>
                            </div>
                        </div>
                    </div>

                    <div id="TableSection">
                        <div id="StatsTitle">
                            <p>Lifetime Stats</p>
                            {!(this.state.showLoading) || <div id="loadingIcon">
                                <img src={loadingIcon} />
                            </div>}
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
                                            <td className="tableCell">{(Math.round(row.completion * 100) / 100).toFixed(2)} </td>
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