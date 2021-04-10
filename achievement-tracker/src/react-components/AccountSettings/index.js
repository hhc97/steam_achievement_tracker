import React from "react"
import { CurrentHeaderButton, HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import logo from './../../steamIcon2.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { storeImage, getImage } from '../../actions/profilePic'

import { logout, changePassword } from '../../actions/reactAuth'

import "./style.css"

class AccountSettings extends React.Component {
    constructor(props) {
        super(props)

        const userName = this.props.app.state.currentUser

        this.state = {
            userName: userName,
            passwordInput: "",
            passwordHidden: true,
            steamInput: "PolarisTM",
            ubisoftInput: "Polaris04",
            playstationInput: "Dancin9D0nZ",
            xboxInput: "N/A",
            image: "",
            uploadImage: ""
        }

        this.handleSumbitImage = this.handleSumbitImage.bind(this)
    }

    async componentDidMount() {
        await getImage(this.state.userName, this)
    }

    editAction = input => {
        if (document.getElementById(input).className === "hide") {
            document.getElementById(input).className = "show"
            let button = document.getElementById(input).parentElement.lastChild
            button.innerHTML = "Save"
            button.style.backgroundColor = "#007bff"
            button.style.borderColor = "#007bff"
        } else {
            document.getElementById(input).className = "hide"
            this.setState({
                [input]: document.getElementById(input).value
            })
            if (input === "passwordInput") {
                const newPassword = document.getElementById(input).value
                console.log(newPassword)
                changePassword(newPassword)
                this.setState({ passwordHidden: false })
            }
            let button = document.getElementById(input).parentElement.lastChild
            button.innerHTML = "Edit"
            button.style.backgroundColor = "#6c757d"
            button.style.borderColor = "#6c757d"
        }
    }

    _handleReaderLoaded = (readerEvent) => {
        const binaryString = readerEvent.target.result
        this.setState({
            uploadImage: btoa(binaryString)
        })
    }

    handleSumbitImage = (e) => {
        e.preventDefault()
        storeImage(this)
    }

    handleselectedFile = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = this._handleReaderLoaded.bind(this)
            reader.readAsBinaryString(file)
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
                                <HeaderButton path='/Dashboard'>Dashboard</HeaderButton>
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                                <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                                <CurrentHeaderButton path='/AccountSettings'>Settings</CurrentHeaderButton>
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
                            {this.state.image === "" ?
                                <img id="CurrentProfilePic" src={sampleProfilePic} /> :
                                <img id="CurrentProfilePic" src={"data:image/png;base64," + this.state.image} />
                            }
                            <div id="ProfilePicCaption">
                                <span> Current Picture ▲ </span>
                            </div>
                        </div>
                        {/* Saving the profile picture to your profile is currently non functional as we need the backend to store the image the user uploads */}
                        <div id="UploadProfilePic">
                            <span> Upload a new image: </span>
                            <form onChange={this.handleselectedFile} onSubmit={this.handleSumbitImage}>
                                <input type="file" name="image" accept=".jpeg, .png, .jpg" />
                                <input type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInputButton">
                        <p>Username: <span> {this.state.userName} </span></p>
                    </div>
                    <div className="TextInputButton">
                        <p> Password: <span> {this.state.passwordHidden ? "*".repeat(8) : this.state.passwordInput} </span></p>
                        <input className="hide" type="text" id="passwordInput"></input>
                        <button type="button" className="btn btn-secondary" onClick={() => { this.editAction("passwordInput") }}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;