import React from "react";
import { uid } from "react-uid";

import AdminSearchBar from "./../AdminSearchBar";
import UserBar from "./../UserBar";
import ReviewBar from "./../ReviewBar";
import { HeaderButton, HeaderImage, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import { getReviewsOnAdmin, updateReview, deleteReviewOnAdmin, updateUsernameReputation } from '../../actions/review'
import { deleteUserOnAdmin, getUsersOnAdmin } from "../../actions/user"
import { logout } from '../../actions/reactAuth'
import logo from './../../steamIcon2.png'
import "./styles.css"
import { deleteVoteRecordByReview, deleteVoteRecordByUser } from "../../actions/voteRecord";


const log = console.log

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userSearch: "",
      reviewSearch: "",
      users: [],
      usersOnPage: [],
      reviews: [],
      reviewsOnPage: []
    }

    this.deleteUser = this.deleteUser.bind(this)
    this.deleteReview = this.deleteReview.bind(this)
    this.refreshUsers = this.refreshUsers.bind(this)
    this.refreshReviews = this.refreshReviews.bind(this)
  }

  componentDidMount() {
    getUsersOnAdmin(this)
    getReviewsOnAdmin(this)
  }

  handleUserSearchChange = event => {
    const target = event.target;
    this.setState({
      userSearch: target.value
    })
  }

  searchUser = () => {
    const userList = this.state.users.filter(user => {
      return user.username.includes(this.state.userSearch)
    })

    this.setState({
      usersOnPage: userList
    })
  }

  handleReviewSearchChange = event => {
    const target = event.target;
    this.setState({
      reviewSearch: target.value
    })
  }

  searchReview = () => {
    const reviewList = this.state.reviews.filter(review => {
      return review.title.includes(this.state.reviewSearch)
    })

    this.setState({
      reviewsOnPage: reviewList
    })
  }

  deleteUser = username => {
    const userList = this.state.users.filter(user => user.username !== username)
    this.setState({
      users: userList,
      usersOnPage: userList
    })

    // Delete this user in database
    const user = this.state.users.filter(user => user.username === username)[0]
    updateUsernameReputation(username, user.reputation, true)
    deleteUserOnAdmin(user)
    deleteVoteRecordByUser(username)

  }

  deleteReview = reviewId => {
    const reviewList = this.state.reviews.filter(review => review.id !== reviewId)
    this.setState({
      reviews: reviewList,
      reviewsOnPage: reviewList
    })

    // Delete this review in database
    const review = this.state.reviews.filter(review => review.id === reviewId)[0]
    deleteReviewOnAdmin(review)
    deleteVoteRecordByReview(review.author, reviewId)
  }

  cancelReport = reviewId => {
    const reviewList = this.state.reviews.map(review => {
      if (review.id === reviewId) {
        review.reported = false
      }
      return review
    })
    this.setState({
      reviews: reviewList,
      reviewsOnPage: reviewList
    })

    // Update review in database
    updateReview(this.state.reviews.filter(review => review.id === reviewId)[0])
  }

  refreshUsers = () => {
    this.setState({
      usersOnPage: this.state.users,
      userSearch: ""
    })
  }

  refreshReviews = () => {
    this.setState({
      reviewsOnPage: this.state.reviews,
      reviewSearch: ""
    })
  }

  render() {
    return (
      <div>
        <HeadContainer bgId={"dashboard"}>
          <HeaderNavBar>
            <HeaderImage to='/' src={logo} />
            <div className='group'>
              <HeaderButton path='/' logoutFunc={() => { logout(this.props.app) }}>Log Out</HeaderButton>
            </div>
          </HeaderNavBar>
        </HeadContainer>

        <div className="admin-dashboard">
          <div className="admin-dashboard-component">
            <AdminSearchBar
              searchContent={this.state.userSearch}
              handleChange={this.handleUserSearchChange}
              enterButton={this.searchUser}
              refreshButton={this.refreshUsers}
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
              refreshButton={this.refreshReviews}
            />

            {this.state.reviewsOnPage.map(review => (
              <ReviewBar
                key={uid(review)}
                id={review.id}
                title={review.title}
                content={review.content}
                author={review.author}
                reputation={review.reputation}
                reported={review.reported}
                deleteReview={this.deleteReview}
                cancelReport={this.cancelReport}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;