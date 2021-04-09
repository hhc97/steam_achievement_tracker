import React from 'react'
import {HeaderButton, HeaderImage, HeadContainer, HeaderNavBar} from '../../react-components/HeaderComponent'
import logo from './../../steamIcon2.png'
import './style.css'

class HeaderContainer extends React.Component{
    render() {
        return (
            <HeadContainer bgId = {this.props.bgId}>
                <HeaderNavBar>
                    <HeaderImage to='/' src={logo}/>
                    <div className="groupButton">
                        <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                        <HeaderButton path='/Login'>Login</HeaderButton>
                        <span className="slash">/</span>
                        <HeaderButton path='/Signup'>Sign Up</HeaderButton>
                    </div>
                </HeaderNavBar>
            </HeadContainer>
        )
    }
}

export default HeaderContainer