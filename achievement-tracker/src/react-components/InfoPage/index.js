import React from "react";
import { CurrentHeaderButton, HeaderButton, HeaderNavBar, HeaderImage, HeadContainer } from '../HeaderComponent'
import './InfoPage.css'
import logo from './../../steamIcon2.png'
import method1_1 from './imgs/method1_1.png'
import method1_2 from './imgs/method1_2.png'
import method1_3 from './imgs/method1_3.png'
import method2_1 from './imgs/method2_1.png'
import method2_2 from './imgs/method2_2.png'
import method2_3 from './imgs/method2_3.png'
import addendum_1 from './imgs/addendum_1.png'
import addendum_2 from './imgs/addendum_2.png'
import notes1 from './imgs/notes1.png'
import notes2 from './imgs/notes2.png'


class SteamInfo extends React.Component {
    render() {
        return (
            <div id="SteamInfo">
                <HeadContainer bgId={"dashboard"}>
                    <HeaderNavBar>
                        <HeaderImage to="/dashboard" src={logo}></HeaderImage>
                        <div className='group'>
                            <CurrentHeaderButton path='/SteamInfo'>Info</CurrentHeaderButton>
                            <HeaderButton path='/'>Home</HeaderButton>
                        </div>
                    </HeaderNavBar>
                </HeadContainer>
                <div id="InfoPage">
                    <div id="InfoTitle">
                        <h1> How do I find my Steam ID? </h1>
                    </div>

                    <div id="InfoBody">
                        <div id="Introduction">
                            <p> Not sure what your Steam ID is, or where to find it? Not to worry! This simple guide explains it all. </p>
                            <p> Your Steam ID is a 64-bit integer unique to your profile. We require it from all users so that we can reliably
                                identify and locate your Steam profile to show you up-to-date and accurate statistics about your gaming history. </p>
                            <p> You can locate your ID on your Steam profile by following the steps below: </p>
                        </div>
                        <div id="Method1">
                            <h2> Method 1: New or Limited Steam Accounts </h2>
                            <div className="methodDescription">
                                <p> If your Steam account is relatively new (created in 2018 or later)
                                or is a limited account (you have spent less than the equivalent of 10 USD on the Steam Store),
                                    you will probably be able to find your Steam ID on your profile's URL.</p>
                            </div>
                            <div className="methodSteps">
                                <ol>
                                    <li> Log in to your Steam account, either on your browser or through the Steam desktop client. </li>
                                    <li> Navigate to your personal profile page. You can do this using the drop down menu on the PROFILE tab
                                    in the center of the header of the client window, next to the COMMUNITY tab.
                                    The name of the Profile tab would be replaced by your personal display name, as shown (marked
                                        in red) in the example image below: </li>
                                    <div className="methodImage">
                                        <img src={method1_1} />
                                    </div>
                                    <li> Locate the URL of the Profile page that you are currently on. If using a browser, you should
                                    see the URL in the location bar of your browser window. If using the Steam desktop client,
                                        the URL of the page should appear below the client window's header in green text by default 
                                        <a href="#Notes"> <sup> [ * ] </sup> </a> (indicated in the example image below): </li>
                                    <div className="methodImage">
                                        <img src={method1_2} />
                                    </div>
                                    <li> Your unique Steam ID is the 17-digit number at the end of the URL. For most users, this ID will
                                    typically start with the 4 digits '7656'.
                                        <div className="methodImage">
                                            <img src={method1_3} />
                                        </div>
                                        If you don't find such a number in the URL at this point,
                                        you may have overwritten that part of your profile through customization. Don't worry, try the
                                        steps in <a href="#Method2"> Method 2 </a> below.
                                    </li>
                                    <li> IMPORTANT: Before creating your account, please make sure your Steam details are set to Public, so that we can
                                        use your data to populate your profile properly. You can visit the <a href="#Addendum"> Addendum </a> below,
                                        for more information on how to do this. </li>
                                    <li> Once you have located your Steam ID, copy the entire number and return to the AchievementTracker's
                                        Sign Up page to resume your account creation process. </li>
                                    <li> Enter your ID in the relevant input field, with the description "Enter Steam ID". Fill out the other
                                    input fields as required too, and Sign Up for an account.
                                    </li>
                                    <li> Congratulations! You have officially signed up for an AchievementTracker account! We hope you enjoy
                                    the services we have to offer.
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div id="Method2">
                            <h2> Method 2: Legacy or Veteran Accounts </h2>
                            <div className="methodDescription">
                                <p> If you have significantly customized your Steam account over its lifetime, perhaps by adding a Vanity URL
                                    or frequently changing your display name, your Steam ID may not appear in the URL of your profile page. </p>
                                <p> If this is the case, this is no problem at all. You can still find your Steam ID through your profile.
                                Just follow the steps below, and once you have successfully created an AchievementTracker account, you
                                    can continue customizing your Steam profile however you like! </p>
                            </div>
                            <div className="methodSteps">
                                <ol>
                                    <li> Log in to your Steam account, either through your browser or the desktop client. </li>
                                    <li> Navigate to your personal Profile page. Review Step 2 of Method 1 above, if necessary. </li>
                                    <div className="methodImage">
                                        <img src={method1_1} />
                                    </div>
                                    <li> Click the "Edit Profile" button on the right side of your Profile banner (indicated in the example below): </li>
                                    <div className="methodImage">
                                        <img src={method2_1} />
                                    </div>
                                    <li> This should take you to a customization screen that allows you to personalize multiple aspects
                                    of your profile. Hopefully you are familiar with this page. Click the "General" tab on the left side
                                        of the page and scroll down to the "Custom URL" field. </li>
                                    <div className="methodImage">
                                        <img src={method2_2} />
                                    </div>
                                    <li> Clear the Custom URL field to reveal your unique Steam ID. (Don't worry! You can reapply your Custom URL
                                    once you have successfully signed up for an AchievementTracker account. If you wish, you can save your
                                        Custom URL in a different location to easily reapply it later.) </li>
                                    <li> Now that you have cleared the Custom URL, your Steam ID should be revealed in the note below the input field.
                                        It is a 17-digit number, which for most users starts with the 4 digits "7656" (indicated in the example below): </li>
                                    <div className="methodImage">
                                        <img src={method2_3} />
                                    </div>
                                    <li> IMPORTANT: Before creating your account, please make sure your Steam details are set to Public, so that we can
                                        use your data to populate your profile properly. You can visit the <a href="#Addendum"> Addendum </a> below,
                                        for more information on how to do this. </li>
                                    <li> Now that you have set your profile data to Public and have successfully located your Steam ID, copy the entire
                                        number and return to the AchievementTracker's Sign Up page to resume your account creation process. </li>
                                    <li> Enter your ID in the relevant input field, and fill out the other input fields as required to Sign Up. </li>
                                    <li> Congratulations! You have officially signed up for an AchievementTracker account! We hope you enjoy
                                        the services we have to offer. </li>
                                </ol>
                            </div>
                        </div>
                        <div id="Addendum">
                            <h2> Addendum: Setting your Profile Details to Public </h2>
                            <div className="methodDescription">
                                <p> This section describes how to set your game details to Public, so that we can access your data and present the
                                    relevant visualizations for you. </p>
                            </div>
                            <div className="methodSteps">
                                <ol>
                                    <li> Navigate to your personal Profile page. </li>
                                    <li> Click the "Edit Profile" button on the right side of your Profile banner (indicated in the example below): </li>
                                    <div className="methodImage">
                                        <img src={method2_1} />
                                    </div>
                                    <li> Click on the "Privacy Settings" tab on the left side of the page. This should present you with a list of your
                                        account details, each of which you can customize the privacy level of (indicated in the example below): </li>
                                    <div className="methodImage">
                                        <img src={addendum_1} />
                                    </div>
                                    <li> Make sure the "My Basic Details", "My Profile", "Game Details", and "Friends List" elements are all set to "Public", 
                                        and uncheck the "Always keep my total playtime private" option as well, if applicable (all shown in below example): </li>
                                    <div className="methodImage">
                                        <img src={addendum_2} />
                                    </div>
                                    <li> Once you have completed all the above steps, you can continue your account creation process through AchievementTracker's 
                                        Sign Up page. </li>
                                </ol>
                            </div>
                        </div>
                        <div id="Notes">
                            <p> <a href="#Notes"> * </a> : If you are using the desktop client and the URL is not visible in the aforementioned location,
                                    you may need to check your Steam client settings. Navigate to the Settings page by clicking the "Steam" tab at the
                                    top-left of the window and click on "Settings" in the resulting drop-down menu. In the "Interface" tab of the resulting
                                    pop-up window, make sure the "Display web address bars when available" option is checked and save your settings.
                                    After doing that, continue the process outlined above. </p>
                            <div id="NotesImage1">
                                <img src={notes1} />
                            </div>
                            <div id="NotesImage2">
                                <img src={notes2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SteamInfo;