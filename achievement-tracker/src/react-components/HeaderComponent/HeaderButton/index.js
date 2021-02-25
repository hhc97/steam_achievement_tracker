import React from 'react'
import './style.css'
import { withRouter } from 'react-router-dom'


class HeaderButton extends React.Component {

    redirectTO(){
        this.props.history.push(this.props.path)
    }

    render() {

        return (
            <button className ="headerButton" onClick={this.redirectTO.bind(this)}>{this.props.children}</button>
        )
    }
}

export default withRouter (HeaderButton);