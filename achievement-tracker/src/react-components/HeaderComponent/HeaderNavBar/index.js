import React from 'react'
import './style.css'

class HeaderNavBar extends React.Component{
    render(){
        return(
            <div className='headerNavBar' {...this.props}>{this.props.children}</div>
        )
    }
}

export default HeaderNavBar