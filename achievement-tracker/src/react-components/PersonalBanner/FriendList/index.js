import React from 'react';
import './style.css'

class FriendList extends React.Component{
    render(){
        return(
            <ul className="friendList" {...this.props}>{this.props.children}</ul>
        )
    }
}

export default FriendList