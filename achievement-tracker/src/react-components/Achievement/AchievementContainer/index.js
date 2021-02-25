import React from 'react'
import './style.css'

class AchievementContainer extends React.Component{
    render(){
        return(
            <ul className='achievementContainer' {...this.props}>{this.props.children}</ul>
        )
    }
}

export default AchievementContainer