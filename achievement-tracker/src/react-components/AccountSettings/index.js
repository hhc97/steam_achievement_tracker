import React from "react"
import sampleProfilePic from "./imgs/sampleProfilePic.jpg"
import "./style.css"

class AccountSettings extends React.Component{
    render() {
        return (
            <div id="AccountSettingsPage">
                <div id="TitleSection">
                    <h1> Account Settings for user1 </h1>
                </div>
                <div id="ProfilePicBlock">
                    <h2> Profile Picture </h2>
                    <div id="ProfilePicSection"> 
                        <img id="CurrentProfilePic" src={sampleProfilePic}/>
                        <div id= "ProfilePicCaption"> 
                        <span> Current Picture </span>
                        <button classname="editButton"> Edit </button>
                        </div>
                    </div>
                </div>
                <div id="UserDetailsSection">
                    <h2> User Details </h2>
                    <div className="TextInput+Button">
                    <p> Username: <span> user1 </span>  <button className="editButton"> Edit </button> </p>
                    </div>
                    <div className="TextInput+Button">
                    <p> Password: <span> **** </span> <button className="editButton"> Edit </button> </p>
                    </div>
                </div>
                <div id="ExternalLinksSection">
                    <h2> External Links </h2>
                    <div className="TextInput+Button"> 
                        <p> Steam: <span> PolarisTM </span> <button className="editButton"> Edit </button> </p>
                    </div>
                    <div className="TextInput+Button"> 
                    <p> Ubisoft: <span> Polaris04 </span> <button className="editButton"> Edit </button> </p> 
                    </div>
                    <div className="TextInput+Button"> 
                    <p> PlayStation: <span> Dancin9D0nZ </span> <button className="editButton"> Edit </button> </p>
                    </div>
                    <div className="TextInput+Button"> 
                    <p> Xbox: <span> N/A </span> <button className="editButton"> Edit </button> </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings;