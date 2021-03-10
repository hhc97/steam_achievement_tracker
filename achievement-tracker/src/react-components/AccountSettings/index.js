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
                                <HeaderButton path='/Home'>Log Out</HeaderButton>
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
                        <img id="CurrentProfilePic" src={sampleProfilePic} />
                        <div id="ProfilePicCaption">
                            <span> Current Picture </span>
                            <input type="file" name="" onChange={this.handleselectedFile}/>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInput+Button">
                        <p> Username: <span> user1 </span>  <button className="editButton">  </button> </p>
                    </div>
                    <div className="TextInput+Button">
                        <p> Password: <span> **** </span> <button className="editButton">  </button> </p>
                    </div>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>
                    <div className="TextInput+Button">
                        <p> Steam: <span> PolarisTM </span> <button className="editButton">  </button> </p>
                    </div>
                    <div className="TextInput+Button">
                        <p> Ubisoft: <span> Polaris04 </span> <button className="editButton">  </button> </p>
                    </div>
                    <div className="TextInput+Button">
                        <p> PlayStation: <span> Dancin9D0nZ </span> <button className="editButton">  </button> </p>
                    </div>
                    <div className="TextInput+Button">
                        <p> Xbox: <span> N/A </span> <button className="editButton">  </button> </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;