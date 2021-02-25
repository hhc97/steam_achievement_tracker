import React from 'react'
import './style.css'

class HeadContainer extends React.Component {
    render() {
        return (
            <div className="headerContainer">{this.props.children}</div>
        )
    }
}

export default HeadContainer;