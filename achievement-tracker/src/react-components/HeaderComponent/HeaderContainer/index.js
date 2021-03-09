import React from 'react'
import './style.css'

class HeadContainer extends React.Component {

    render() {
        return (
            <div className="headerContainer" id={this.props.bgId}>{this.props.children}</div>
        )
    }
}

export default HeadContainer;