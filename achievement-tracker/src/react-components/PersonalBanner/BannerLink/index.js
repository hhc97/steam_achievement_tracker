import React from 'react'
import {Link} from 'react-router-dom'
import './style.css'


class BannerLink extends React.Component{
    render(){
        const {path} = this.props
        return(
            <Link to={{pathname:path}} target="_blank" className="bannerLink">{this.props.children}</Link>
        )
    }
}

export default BannerLink