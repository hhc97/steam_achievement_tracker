import React from 'react'
import './style.css'


class HomeBody extends React.Component {

    render() {
        return (
            <div className="homeBodyText">{this.props.children}</div>
        )
    }
}

export default HomeBody;