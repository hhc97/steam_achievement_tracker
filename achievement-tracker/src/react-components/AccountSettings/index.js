import React from "react"
import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import logo from './../../steamIcon2.png'
import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from '../../actions/reactAuth'

import "./style.css"

class AccountSettings extends React.Component {
    constructor(props) {
        super(props)

        const userName = this.props.app.state.currentUser

        this.state = {
            userName: userName,
            password: "sdfhgdhkfgjdg",
            steamInput: "PolarisTM",
            ubisoftInput: "Polaris04",
            playstationInput: "Dancin9D0nZ",
            xboxInput: "N/A"
        }
    }

    editAction = input => {
        if (document.getElementById(input).className === "hide") {
            document.getElementById(input).className = "show";
        } else {
            document.getElementById(input).className = "hide"
            this.setState({
                [input]: document.getElementById(input).value
            })
        }
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
        console.log(event.target.files)
    }

    render() {
        return (
            <div id="AccountSettingsPage">
                <div id="HeaderSection">
                    <HeadContainer bgId={"dashboard"}>
                        <HeaderNavBar>
                            <HeaderImage to="/dashboard" src={logo}></HeaderImage>
                            <div className='group'>
                                <HeaderButton path='/Dashboard'>Dashboard</HeaderButton>
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                                <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                                <HeaderButton path='/AccountSettings'>Settings</HeaderButton>
                                <HeaderButton path='/' logoutFunc={() => { logout(this.props.app) }}>Log Out</HeaderButton>
                            </div>
                        </HeaderNavBar>
                    </HeadContainer>
                </div>

                <div id="TitleSection">
                    <h1> Account Settings for {this.state.userName} </h1>
                </div>
                <div id="ProfilePicBlock">
                    <h2> Profile Picture </h2>
                    <div id="ProfilePicSection">
                        <div id="ProfilePicDisplay">
                            <img id="CurrentProfilePic" src={sampleProfilePic} />
                            <div id="ProfilePicCaption">
                                <span> Current Picture ▲ </span>
                            </div>
                        </div>
                        {/* Saving the profile picture to your profile is currently non functional as we need the backend to store the image the user uploads */}
                        <div id="UploadProfilePic">
                            <span> Upload a new image: </span>
                            <input type="file" name="" onChange={this.handleselectedFile} />
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInputButton">
                        <p>Username: <span> {this.state.userName} </span></p>
                    </div>
                    <div className="TextInputButton">
                        <p> Password: <span> {"*".repeat(this.state.password.length)} </span></p>
                    </div>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>

                    <div className="TextInputButton">
                        <p>Steam: <span>{this.state.steamInput}</span></p>
                        <input className="hide" type="text" id="steamInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => { this.editAction("steamInput") }}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInputButton">
                        <p>Ubisoft: <span>{this.state.ubisoftInput}</span></p>
                        <input className="hide" type="text" id="ubisoftInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => { this.editAction("ubisoftInput") }}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInputButton">
                        <p>PlayStation: <span>{this.state.playstationInput}</span></p>
                        <input className="hide" type="text" id="playstationInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => { this.editAction("playstationInput") }}>
                            Edit
                        </button>
                    </div>

                    <div className="TextInputButton">
                        <p>Xbox: <span>{this.state.xboxInput}</span></p>
                        <input className="hide" type="text" id="xboxInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => { this.editAction("xboxInput") }}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;