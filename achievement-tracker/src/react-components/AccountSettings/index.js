import React from "react"
import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import "./style.css"

class AccountSettings extends React.Component{
    render() {
        return (
            <div id="AccountSettingsPage">
                <div id="TitleSection">
                    <h1> Account Settings for PolarisTM </h1>
                </div>
                <div id="ProfilePicBlock">

                    <h2> Profile Picture </h2>
                    <div id="ProfilePicSection"> 
                        <img id="CurrentProfilePic" src={sampleProfilePic}/>
                        <span> Current Picture </span>
                        <button classname="editButton"> Edit </button>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <p> Username: <span> PolarisTM </span> </p> <button className="editButton"> Edit </button>
                    <p> Password: <span> afacd1234 </span> </p> <button className="editButton"> Edit </button>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>
                    <div className="TextInput+Button"> 
                        <p> Steam: <span> PolarisTM </span> <button className="editButton"> Edit </button> </p>
                    </div>
                    <p> Ubisoft: <span> Polaris04 </span> </p> <button className="editButton"> Edit </button>
                    <p> PlayStation: <span> Dancin9D0nZ </span> </p> <button className="editButton"> Edit </button>
                    <p> Xbox: <span> N/A </span> </p> <button className="editButton"> Edit </button>
                </div>
            </div>
        )
    }
}

export default AccountSettings;