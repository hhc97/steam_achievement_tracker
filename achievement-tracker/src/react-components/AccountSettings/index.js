import React from "react"
import { HeaderButton, HeadContainer, HeaderNavBar, HeaderImage } from '../HeaderComponent'

import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import logo from './../../logo.svg'

import "./style.css"

class AccountSettings extends React.Component {

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
                            <img id="CurrentProfilePic" src={sampleProfilePic} />
                            <div id="ProfilePicCaption">
                                <span> Current Picture ▲ </span>
                            </div>
                        </div>
                        <div id="UploadProfilePic">
                            <span> Upload a new image: </span>
                            <input type="file" name="" onChange={this.handleselectedFile}/>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInputButton">
                        <p> Username: <span> user1 </span></p> <button className="editButton">  </button>
                    </div>
                    <div className="TextInputButton">
                        <p> Password: <span> **** </span></p> <button className="editButton">  </button>
                    </div>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>
                    <div className="TextInputButton">
                        <p> Steam: <span> PolarisTM </span></p> <button className="editButton">  </button>
                    </div>
                    <div className="TextInputButton">
                        <p> Ubisoft: <span> Polaris04 </span> </p> <button className="editButton">  </button>
                    </div>
                    <div className="TextInputButton">
                        <p> PlayStation: <span> Dancin9D0nZ </span> </p> <button className="editButton">  </button>
                    </div>
                    <div className="TextInputButton">
                        <p> Xbox: <span> N/A </span> </p> <button className="editButton">  </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;