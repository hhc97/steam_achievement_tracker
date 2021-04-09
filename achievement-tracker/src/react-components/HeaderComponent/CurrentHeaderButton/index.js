import React from 'react'
import './style.css'
import userKey from './../../UserKeys'
import { withRouter } from 'react-router-dom'



class CurrentHeaderButton extends React.Component {

    redirectTO(){
        if (this.props.children == "Log Out"){
            userKey.logOut()
            this.props.logoutFunc()
            console.log(localStorage.getItem("user"))
        }
        this.props.history.push(this.props.path)
    }

    render() {
        //const {logoutFunc} = this.props
        return (
            <button className ="currentHeaderButton" onClick={this.redirectTO.bind(this)}>{this.props.children}</button>
        )
    }
}

export default withRouter (CurrentHeaderButton);