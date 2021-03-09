import React from "react";

import "./styles.css"

class UserBar extends React.Component {
  render() {
    const {
      username,
      reputation,
      deleteUser
    } = this.props;

    return (
      <div className="user-bar">
        <h3>Username: {username}</h3>
        <p>Reputation: {reputation}</p>
        <button
          onClick={() => { deleteUser(username) }}
        >
          Delete User
        </button>
      </div>
    )
  }
}

export default UserBar;