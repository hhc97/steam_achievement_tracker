import React from "react";

import "./styles.css"

class AdminSearchBar extends React.Component {
  render() {
    const {
      searchContent,
      handleChange,
      enterButton
    } = this.props;

    return (
      <div className="admin-search-bar-container">
        <input name="searchContent"
          value={searchContent}
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          label="searchContent"
        />
        <input type="submit"
          value="Enter"
          onClick={enterButton}
        />
      </div>
    )
  }
}

export default AdminSearchBar;