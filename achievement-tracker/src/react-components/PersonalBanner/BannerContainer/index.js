import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'

class BannerContainer extends React.Component{
    render(){
        return(
            <div {...this.props} className="bannerContainer">{this.props.children}</div>
        )
    }
}

export default BannerContainer;