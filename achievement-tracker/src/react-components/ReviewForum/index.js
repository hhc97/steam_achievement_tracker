import React from "react";

import SearchBar from "./../SearchBar"

class ReviewForum extends React.Component {
  state = {
      searchContent: ""
  }

  handleSearchContentChange = event => {
    const target = event.target;
    this.setState({
      searchContent: target.value
    })
  }

	handleSearchButton = event => {
		console.log("Search!")
	}

  render() {
    return (
      <div>
        <SearchBar
          searchContent={this.state.searchContent}
					handleChange={this.handleSearchContentChange}
					enterButton={this.handleSearchButton}
				/>
        </div>
    )
  }
}

export default ReviewForum;