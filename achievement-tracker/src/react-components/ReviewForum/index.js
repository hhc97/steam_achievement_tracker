import React from "react";

import ReviewSection from "./../ReviewSection"

import "./styles.css"

class ReviewForum extends React.Component {
  state = {
			reviews: [
				{
					id: 1,
					title: "Hollow Knight Review",
					content: "BEST GAME EVER",
					upvotes: 21,
					downvotes: 4,
					author: "John Smith",
					reputation: 3
				},
				{
					id: 2,
					title: "Some personal thoughts on Northgard...",
					content: "It's more of a casual area-control boardgame than anything, so much so that they made an actual boardgame out of it and it plays the same. Northgard has nice aesthetics but it's not really a city or an empire builder on the likes of AoE. So, my take on a few reviews here is that people who never played AoE are comparing this game to it without any context. Extremely light resource management, you can't chose where to plop down buildings as you see fit and army management is non-existent. Saddly, it's a toddler's RTS.",
					upvotes: 3,
					downvotes: 0,
					author: "Rentt Vivie",
					reputation: 3
				}
			]
  }

  render() {
    return (
      <div>
				<ReviewSection
					reviews={this.state.reviews}
				/>
      </div>
    )
  }
}

export default ReviewForum;