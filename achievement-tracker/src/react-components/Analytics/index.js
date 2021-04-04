import React from "react"
import { uid } from "react-uid"

import sampleProfilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import logo from './../../logo.svg'

import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import "./Analytics.css"

// All of the statistics listed on this page, both in the banner and in the below table, are hardcoded sample values.
// In phase 2, we will use API calls to populate this part of the user's profile with the relevant statistics we pull.

let stats = [
    { id: 1, title: "Game01Title", unlocked: 20, total: 25, playtime: 50.5, completion: 80.00 },
    { id: 2, title: "Game52Title", unlocked: 17, total: 32, playtime: 32.7, completion: 53.13 },
    { id: 3, title: "Game173Title", unlocked: 9, total: 20, playtime: 41.5, completion: 45.00 },
    { id: 4, title: "Game57Title", unlocked: 12, total: 20, playtime: 2.5, completion: 60.00 }
]

class Analytics extends React.Component {

    state = {
        stats: stats
    }

    onSortDown(column) {
        stats.sort((a, b) => {
            if (typeof (a[column]) == "string") {
                console.log(typeof (a[column]))
                return (a[column].localeCompare(b[column]))
            }
            return (a[column] - b[column])
        })
        console.log("sorted down")
        this.setState({
            stats: stats
        })
    }

    onSortUp(column) {
        stats.sort((a, b) => {
            if (typeof (a[column]) == "string") {
                console.log(typeof (a[column]))
                return (b[column].localeCompare(a[column]))
            }
            return (b[column] - a[column])
        })
        console.log("sorted up")
        this.setState({
            stats: stats
        })
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
                                <HeaderButton path='/'>Log Out</HeaderButton>
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
                                    <p>user</p>
                                    <span>Member for 5 months</span>
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
                                <span> 79 </span>
                            </div>
                            <div className="StatBoxCenter">
                                <p>Total Playtime</p>
                                <span> 625.7 hours </span>
                            </div>
                            <div className="StatBoxRight">
                                <p>Reviews Posted</p>
                                <span> 42 </span>
                            </div>
                        </div>

                        <div className="StatsRow" id="StatsRow2">
                            <div className="StatBoxLeft">
                                <p>Average Completion</p>
                                <span> 37.8% </span>
                            </div>
                            <div className="StatBoxCenter">
                                <p>Average Playtime</p>
                                <span> 70.7 hours </span>
                            </div>
                            <div className="StatBoxRight">
                                <p>Review Score</p>
                                <span> 762 </span>
                            </div>
                        </div>
                    </div>

                    <div id="TableSection">
                        <p>Lifetime Stats</p>

                        <table id="StatsTable">
                            <thead >
                                <tr>
                                    <th id="tableID" className="tableHeader">ID
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("id")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("id")}><span>▼</span></button>
                                        </div>
                                    </th>
                                    <th id="tableTitle" className="tableHeader">Title
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("title")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("title")}><span>▼</span></button>
                                        </div>
                                    </th>
                                    <th id="tableCompletion" className="tableHeader">Completion%
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("completion")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("completion")}><span>▼</span></button>
                                        </div>
                                    </th>
                                    <th id="tableUnlocked" className="tableHeader">Unlocked
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("unlocked")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("unlocked")}><span>▼</span></button>
                                        </div>
                                    </th>
                                    <th id="tableTotal" className="tableHeader">Total
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("total")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("total")}><span>▼</span></button>
                                        </div>
                                    </th>
                                    <th id="tablePlaytime" className="tableHeader">Playtime
                                        <div className="sort">
                                            <button className="sortUp" onClick={() => this.onSortUp("playtime")}><span>▲</span></button>
                                            <button className="sortDown" onClick={() => this.onSortDown("playtime")}><span>▼</span></button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stats.map(row => (
                                        <tr key={uid(row)}>
                                            <td className="tableCell">{row.id}</td>
                                            <td className="tableCell">{row.title}</td>
                                            <td className="tableCell">{row.completion}</td>
                                            <td className="tableCell">{row.unlocked}</td>
                                            <td className="tableCell">{row.total}</td>
                                            <td className="tableCell">{row.playtime}</td>
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