import React from "react";

import "./styles.css"

class ForumSearchBar extends React.Component {
  handleEnterKeyDown = event => {
    if (event.key === "Enter") {
      this.props.enterButton()
    }
  }

  render() {
    const {
      searchContent,
      handleChange,
      enterButton,
      refreshButton
    } = this.props;

    return (
      <div className="search-bar-container">
        <input
          name="searchContent"
          value={searchContent}
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          label="searchContent"
          onKeyDown={this.handleEnterKeyDown}
        />
        <input
          type="submit"
          value="Enter"
          onClick={enterButton}
        />
        <button onClick={refreshButton}>
          Clear
        </button>
      </div>
    )
  }
}

export default ForumSearchBar;