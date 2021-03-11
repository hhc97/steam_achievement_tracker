import React from "react"
import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import logo from './../../logo.svg'
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css"

class AccountSettings extends React.Component {
    state = {
        steamInput: "PolarisTM",
        ubisoftInput: "Polaris04",
        playstationInput: "Dancin9D0nZ",
        xboxInput: "N/A"
    }

    editAction = input => {
        if (document.getElementById(input).className === "hide") {
            document.getElementById(input).className="show";
        } else {
            document.getElementById(input).className="hide"
            this.setState({
                [input]: document.getElementById(input).value
            })
        }
    }

    render() {
        return (
            <div id="AccountSettingsPage">
                <div id="HeaderSection">
                    <HeadContainer bgId={"dashboard"}>
                        <HeaderNavBar>
                            <HeaderImage to="/dashboard" src={logo}></HeaderImage>
                            <div className='group'>
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                                <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                                <HeaderButton path='/Home'>Log Out</HeaderButton>
                            </div>
                        </HeaderNavBar>
                    </HeadContainer>
                </div>

                <div id="TitleSection">
                    <h1> Account Settings for user1 </h1>
                </div>
                <div id="ProfilePicBlock">
                    <h2> Profile Picture </h2>
                    <div id="ProfilePicSection">
                        <img id="CurrentProfilePic" src={sampleProfilePic} />
                        <div id="ProfilePicCaption">
                            <span> Current Picture </span>
                            <button className="editButton"> </button>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInput+Button">
                        <p>Username: <span> user1 </span></p> 
                    </div>
                    <div className="TextInput+Button">
                        <p> Password: <span> **** </span></p>
                    </div>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>

                    <div className="TextInput-Button">
                        <p>Steam: <span>{this.state.steamInput}</span></p>
                        <input className="hide" type="text" id="steamInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => {this.editAction("steamInput")}}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInput+Button">
                        <p>Ubisoft: <span>{this.state.ubisoftInput}</span></p>
                        <input className="hide" type="text" id="ubisoftInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => {this.editAction("ubisoftInput")}}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInput+Button">
                        <p>PlayStation: <span>{this.state.playstationInput}</span></p>
                        <input className="hide" type="text" id="playstationInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => {this.editAction("playstationInput")}}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInput+Button">
                        <p>Xbox: <span>{this.state.xboxInput}</span></p>
                        <input className="hide" type="text" id="xboxInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => {this.editAction("xboxInput")}}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;