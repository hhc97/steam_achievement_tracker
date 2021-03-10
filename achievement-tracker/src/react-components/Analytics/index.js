import React from "react"

import sampleProfilePic from "../AccountSettings/imgs/sampleProfilePic.jpg"
import { HeaderButton, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import {AchievementContainer, Game} from "../Achievement"

import "./Analytics.css"

const stats = [
    {
        id: 1,
        title: "Game01Title",
        unlocked: 20,
        total: 25,
        playtime: 50.5
    },
    {
        id: 2,
        title: "Game02Title",
        unlocked: 17,
        total: 32,
        playtime: 32.7
    },
    {
        id: 3,
        title: "Game03Title",
        unlocked: 9,
        total: 20,
        playtime: 41.5
    },
    {
        id: 4,
        title: "Game57Title",
        unlocked: 2,
        total: 20,
        playtime: 2.5
    }
]

class Analytics extends React.Component {
    render() {
        return (
            <div id="AnalyticsPage">

                <div id="HeaderSection">
                    <HeadContainer bgId={"dashboard"}>
                        <HeaderNavBar>
                            <div className='group'>
                            <HeaderButton path='/'>Home</HeaderButton>
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
                                    <th id="tableID" className="tableHeader">ID</th>
                                    <th id="tableTitle" className="tableHeader">Title</th>
                                    <th id="tableCompletion" className="tableHeader">Completion %</th>
                                    <th id="tableUnlocked" className="tableHeader">Unlocked</th>
                                    <th id="tableTotal" className="tableHeader">Total</th>
                                    <th id="tablePlaytime" className="tableHeader">Playtime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                stats.map(row => (
                                    <tr>
                                        <td className="tableCell">{row.id}</td>
                                        <td className="tableCell">{row.title}</td>
                                        <td className="tableCell">{((row.unlocked/row.total) * 100).toFixed(2)}</td>
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