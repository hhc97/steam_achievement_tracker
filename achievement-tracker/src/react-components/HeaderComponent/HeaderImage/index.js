import React from "react";
import {Link} from  "react-router-dom";
import './style.css'

class HeaderImage extends React.Component {
    render() {
        const {to, src} = this.props
        return (
            <Link  to={to}>
                <img src = {src} className="headerImage"/>
            </Link>
        )
    }
}

export default HeaderImage;