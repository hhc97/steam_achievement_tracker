import React from "react";
import { uid } from "react-uid";

import AdminSearchBar from "./../AdminSearchBar";
import UserBar from "./../UserBar";
import Review from "./../Review";

import "./styles.css"

const userData = [
  {
    username: "John Smith",
    reputation: 3
  },
  {
    username: "Diluc Ragnvindr",
    reputation: 7
  }
]
const reviewData = [
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

class Admin extends React.Component {
  state = {
    userSearch: "",
    reviewSearch: "",
    users: userData,
    usersOnPage: userData,
    reviews: reviewData,
    reviewsOnPage: reviewData
  }

  handleUserSearchChange = event => {
    const target = event.target;
    this.setState({
      userSearch: target.value
    })
  }

  searchUser = () => {
    console.log("Search!")

    const userList = this.state.users.filter(user => {
      return user.username.includes(this.state.userSearch)
    })

    this.setState({
      usersOnPage: userList
    })
  }

  searchReview = () => {
    console.log("Search!")

    const reviewList = this.state.reviews.filter(review => {
      return review.title.includes(this.state.userSearch)
    })

    this.setState({
      reviewsOnPage: reviewList
    })
  }

  handleReviewSearchChange = event => {
    const target = event.target;
    this.setState({
      reviewSearch: target.value
    })
  }

  handleReviewSearchButton = event => {
    console.log("Search Review")
  }

  constructor(props) {
    super(props)
    this.upvoteAction = this.upvoteAction.bind(this)
    this.downvoteAction = this.downvoteAction.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  upvoteAction = (id) => {
    console.log("Invalid upvote")
  }

  downvoteAction = (id) => {
    console.log("Invalid downvote")
  }

  deleteUser = (username) => {
    console.log("Delete User")

    const userList = this.state.users.filter(user => user.username !== username)
    this.setState({
      users: userList,
      usersOnPage: userList
    })
  }

  render() {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard-component">
          <AdminSearchBar
            searchContent={this.state.userSearch}
            handleChange={this.handleUserSearchChange}
            enterButton={this.searchUser}
          />

          {this.state.usersOnPage.map(user => (
            <UserBar
              key={uid(user)}
              username={user.username}
              reputation={user.reputation}
              deleteUser={this.deleteUser}
            />
          ))}
        </div>

        <div className="admin-dashboard-component">
          <AdminSearchBar
            searchContent={this.state.reviewSearch}
            handleChange={this.handleReviewSearchChange}
            enterButton={this.searchReview}
          />

          {this.state.reviews.map(review => (
            <Review
              key={uid(review)}
              id={review.id}
              title={review.title}
              content={review.content}
              upvotes={review.upvotes}
              downvotes={review.downvotes}
              author={review.author}
              reputation={review.reputation}
              upvoteAction={this.upvoteAction}
              downvoteAction={this.downvoteAction}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Admin;