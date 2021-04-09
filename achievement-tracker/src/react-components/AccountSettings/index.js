import React from "react"
import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import logo from './../../logo.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import { storeImage, getImage } from '../../actions/profilePic'

import "./style.css"

class AccountSettings extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            image: "",
            uploadImage: "",
            userName: this.props.app.state.currentUser
        }

        this.handleSumbitImage = this.handleSumbitImage.bind(this)
    }

    async componentDidMount(){
        await getImage(this.state.userName, this)
    }

    state = {
        steamInput: "PolarisTM",
        ubisoftInput: "Polaris04",
        playstationInput: "Dancin9D0nZ",
        xboxInput: "N/A"
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
        if (file){
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
                                <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                                <HeaderButton path='/Analytics'>Analytics</HeaderButton>
                                <HeaderButton path='/'>Log Out</HeaderButton>
                            </div>
                        </HeaderNavBar>
                    </HeadContainer>
                </div>

                <div id="TitleSection">
                    <h1> Account Settings for user </h1>
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
                                <input  type="file" name="image" accept= ".jpeg, .png, .jpg" />
                                <input type="submit"/>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInputButton">
                        <p>Username: <span> user </span></p>
                    </div>
                    <div className="TextInputButton">
                        <p> Password: <span> **** </span></p>
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