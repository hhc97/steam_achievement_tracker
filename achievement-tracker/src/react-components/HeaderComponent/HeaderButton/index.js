import React from 'react'
import './style.css'
import userKey from './../../UserKeys'
import { withRouter } from 'react-router-dom'



class HeaderButton extends React.Component {

    redirectTO(){
        if (this.props.children == "Log Out"){
            userKey.logOut()
            this.props.logoutFunc()
        }
        this.props.history.push(this.props.path)
    }

    render() {
        //const {logoutFunc} = this.props
        return (
            <button className ="headerButton" onClick={this.redirectTO.bind(this)}>{this.props.children}</button>
        )
    }
}

export default withRouter (HeaderButton);