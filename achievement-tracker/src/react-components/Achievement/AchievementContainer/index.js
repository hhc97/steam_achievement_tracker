import React from 'react'
import './style.css'

class AchievementContainer extends React.Component {
    render() {
        return (
            <ul className='achievementContainer' id={this.props.bodyId}>{this.props.children}</ul>
        )
    }
}

export default AchievementContainer