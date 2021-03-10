import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css"

class UserBar extends React.Component {
  render() {
    const {
      username,
      reputation,
      deleteUser
    } = this.props;
    
    return(
      <div className="user-bar">
        <div className="user-bar-info">
          <h4><strong>{username}</strong></h4>
          <p>Reputation: {reputation}</p>
        </div>
        <button type="button"
                className="btn btn-danger"
                onClick={() => deleteUser(username)}>
              Delete User
        </button>

      </div>
    )
  }
}

export default UserBar;