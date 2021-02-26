import React from "react";

import SearchBar from "./../SearchBar"
import Review from "./../Review"
import ReviewSubmit from "./../ReviewSubmit"

import "./styles.css"

class ReviewForum extends React.Component {
  state = {
      searchContent: "",
			reviews: [
				{
					title: "Hollow Knight Review",
					content: "BEST GAME EVER",
					upvote: 21,
					downvote: 4,
					author: "John Smith",
					reputation: 3
				},
				{
					title: "Some personal thoughts on Northgard...",
					content: "It's more of a casual area-control boardgame than anything, so much so that they made an actual boardgame out of it and it plays the same. Northgard has nice aesthetics but it's not really a city or an empire builder on the likes of AoE. So, my take on a few reviews here is that people who never played AoE are comparing this game to it without any context. Extremely light resource management, you can't chose where to plop down buildings as you see fit and army management is non-existent. Saddly, it's a toddler's RTS.",
					upvote: 3,
					downvote: 0,
					author: "Rentt Vivie",
					reputation: 3
				}
			],
			reviewSubmitTitle: "",
			reviewSubmitContent: ""
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

	handleSubmitTitleChange = event => {
		const target = event.target;
		this.setState({
			reviewSubmitTitle: target.value
		})
	}

	handleSubmitContentChange = event => {
		const target = event.target;
		this.setState({
			reviewSubmitContent: target.value
		})
	}

	handleSubmitButtonChange = event => {
		console.log("Submit")
	}

  render() {
    return (
      <div>
        <SearchBar
          searchContent={this.state.searchContent}
					handleChange={this.handleSearchContentChange}
					enterButton={this.handleSearchButton}
				/>

				<div className="review-section">
					<h1>Review Section</h1>

					{this.state.reviews.map(review => (
						<Review
							key={Math.random().toString(36).substr(2, 9)}
							title={review.title}
							content={review.content}
							upvote={review.upvote}
							downvote={review.downvote}
							author={review.author}
							reputation={review.reputation}
						/>
					))}
				</div>
				<ReviewSubmit
					reviewSubmitTitle={this.state.reviewSubmitTitle}
					reviewSubmitContent={this.state.reviewSubmitContent}
					handleTitleChange={this.handleSubmitTitleChange}
					handleContentChange={this.handleSubmitContentChange}
					reviewSubmitButton={this.handleSubmitButtonChange}
				/>
      </div>
    )
  }
}

export default ReviewForum;