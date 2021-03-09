import React from "react";

import { HeaderContainer } from '../../Containers'
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
				reputation: 4,
				reported: false
			},
			{
				id: 2,
				title: "Some personal thoughts on Northgard...",
				content: "It's more of a casual area-control boardgame than anything, so much so that they made an actual boardgame out of it and it plays the same. Northgard has nice aesthetics but it's not really a city or an empire builder on the likes of AoE. So, my take on a few reviews here is that people who never played AoE are comparing this game to it without any context. Extremely light resource management, you can't chose where to plop down buildings as you see fit and army management is non-existent. Saddly, it's a toddler's RTS.",
				upvotes: 3,
				downvotes: 0,
				author: "Rentt Vivie",
				reputation: 3,
				reported: false
			},
			{
				id: 3,
				title: "Minion Masters is sick",
				content: "Dude I'm not gonna lie this game is ADDICTED",
				upvotes: 1,
				downvotes: 0,
				author: "Kenji",
				reputation: 2,
				reported: false
			},
			{
				id: 4,
				title: "Stardew Valley",
				content: "I've played this game on and off for 5 years and its still entertaining. If that doesn't speak for the amount of content this game has then i don't know what does. There's always something to do differently every time I come back. I love that i still have the excitement to play that i had back in 2016.",
				upvotes: 31,
				downvotes: 0,
				author: "Rentt Vivie",
				reputation: 3,
				reported: false
			},
			{
				id: 5,
				title: "Danganranpa Review",
				content: "Again, BEST GAME EVER",
				upvotes: 13,
				downvotes: 0,
				author: "John Smith",
				reputation: 4,
				reported: false
			}
		]
	}

	render() {
		return (
			<div>
				<HeaderContainer bgId={'dashboard'} />

				<ReviewSection
					reviews={this.state.reviews}
				/>
			</div>
		)
	}
}

export default ReviewForum;