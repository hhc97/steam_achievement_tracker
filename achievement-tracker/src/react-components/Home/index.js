import React from "react";
import { HeaderContainer } from '../../Containers'
import HomeBody from '../HomeBody'
import './style.css'

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <HeaderContainer bgId={'homePage'} />
                <div className="homeBody">
                    <HomeBody>Welcome</HomeBody>
                </div>
            </div>
        )
    }

}

export default Home;
