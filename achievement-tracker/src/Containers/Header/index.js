import React from 'react'
import {HeaderButton, HeaderImage, HeadContainer, HeaderNavBar} from '../../react-components/HeaderComponent'
import logo from './../../logo.svg'
import './style.css'

class HeaderContainer extends React.Component{
    render() {
        return (
            <HeadContainer>
                <HeaderNavBar>
                    <HeaderImage to='/' src={logo}/>
                    <div className="groupButton">
                        <HeaderButton path='/ReviewForum'>Forum</HeaderButton>
                        <HeaderButton path='/Login'>SignIn</HeaderButton>
                        <span className="slash">/</span>
                        <HeaderButton path='/dashboard'>Dashboard</HeaderButton>
                    </div>
                </HeaderNavBar>
            </HeadContainer>
        )
    }
}

export default HeaderContainer