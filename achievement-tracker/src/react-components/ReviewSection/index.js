import React from "react";
import { uid } from "react-uid";
import "bootstrap/dist/css/bootstrap.min.css";

import ForumSearchBar from "./../ForumSearchBar"
import Review from "./../Review"
import ReviewSubmit from "./../ReviewSubmit"
import "./styles.css"

const reviewNumLimit = 3;

class ReviewSection extends React.Component {
  state = {
    searchContent: "",
    reviews: this.props.reviews,
    reviewsInSection: this.props.reviews,
    reviewsOnPage: this.props.reviews.slice(
      0,
      reviewNumLimit
    ),
    currentPage: 1,
    reviewSubmitTitle: "",
    reviewSubmitContent: ""
  }

  constructor(props) {
    super(props)
    this.upvoteAction = this.upvoteAction.bind(this)
    this.downvoteAction = this.downvoteAction.bind(this)
    this.reportAction = this.reportAction.bind(this)
  }

  upvoteAction = id => {
    const reviewList = this.state.reviews.map(review => {
      if (review.id === id) {
        review.upvotes = review.upvotes + 1
      }
      return review
    })

    this.setState({
      reviews: reviewList
    })
  }

  downvoteAction = id => {
    const reviewList = this.state.reviews.map(review => {
      if (review.id === id) {
        review.downvotes = review.downvotes + 1
      }
      return review
    })

    this.setState({
      reviews: reviewList
    })
  }

  reportAction = id => {
    console.log("Report Review")

    const reviewList = this.state.reviews.map(review => {
      if (review.id === id) {
        review.reported = true
      }
      return review
    })

    this.setState({
      reviews: reviewList
    })
  }

  handleSearchContentChange = event => {
    const target = event.target;
    this.setState({
      searchContent: target.value
    })
  }

  searchReview = () => {
    console.log("Search!")

    const currentSectionReviews = this.state.reviews.filter(review => {
      return review.title.includes(this.state.searchContent)
    })
    const currentPageReviews = currentSectionReviews.slice(
      0,
      reviewNumLimit
    )

    this.setState({
      reviewsInSection: currentSectionReviews,
      reviewsOnPage: currentPageReviews,
      currentPage: 1
    })
  }

  prevPage = () => {
    console.log("previous page")

    if (this.state.currentPage > 1) {
      const currentPage = this.state.currentPage - 1
      const currentPageReviews = this.state.reviewsInSection.slice(
        (currentPage - 1) * reviewNumLimit,
        (currentPage - 1) * reviewNumLimit + reviewNumLimit
      )
      this.setState({
        reviewsOnPage: currentPageReviews,
        currentPage: currentPage
      })
    }
  }

  nextPage = () => {
    console.log("next page")

    if (this.state.currentPage < this.state.reviewsInSection.length / reviewNumLimit) {
      const currentPage = this.state.currentPage + 1
      const currentPageReviews = this.state.reviewsInSection.slice(
        (currentPage - 1) * reviewNumLimit,
        (currentPage - 1) * reviewNumLimit + reviewNumLimit
      )
      this.setState({
        reviewsOnPage: currentPageReviews,
        currentPage: currentPage
      })
    }
  }

  firstPage = () => {
    console.log("first page")

    const currentPageReviews = this.state.reviewsInSection.slice(
      0,
      reviewNumLimit
    )
    this.setState({
      reviewsOnPage: currentPageReviews,
      currentPage: 1
    })
  }

  lastPage = () => {
    console.log("last page")

    const currentPage = Math.ceil(this.state.reviewsInSection.length / reviewNumLimit)
    const currentPageReviews = this.state.reviewsInSection.slice(
      (currentPage - 1) * reviewNumLimit,
      (currentPage - 1) * reviewNumLimit + reviewNumLimit
    )
    this.setState({
      reviewsOnPage: currentPageReviews,
      currentPage: currentPage
    })
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

  addReview = () => {
    const reviewList = this.state.reviews
    const newReview = {
      id: this.state.reviews.length + 1,
      title: this.state.reviewSubmitTitle,
      content: this.state.reviewSubmitContent,
      upvotes: 0,
      downvotes: 0,
      author: "Unknown",
      reputation: 0
    }
    reviewList.push(newReview)
    this.setState({
      reviews: reviewList,
      reviewsInSection: reviewList,
      reviewsOnPage: reviewList.slice(
        (this.state.currentPage - 1) * reviewNumLimit,
        (this.state.currentPage - 1) * reviewNumLimit + reviewNumLimit
      ),
    })
  }

  render() {

    return (
      <div>
        <ForumSearchBar
          searchContent={this.state.searchContent}
          handleChange={this.handleSearchContentChange}
          enterButton={this.searchReview}
        />

        <div className="review-section">
          <h1>Review Section</h1>

          <div className="page-button-bar">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button"
                className="btn btn-dark"
                onClick={this.firstPage}>
                First
              </button>
              <button type="button"
                className="btn btn-secondary"
                onClick={this.prevPage}>
                Prev
              </button>
              <button type="button"
                className="btn btn-secondary"
                onClick={this.nextPage}>
                Next
              </button>
              <button type="button"
                className="btn btn-dark"
                onClick={this.lastPage}>
                Last
              </button>
            </div>
          </div>

          {this.state.reviewsOnPage.map(review => (
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
              reportAction={this.reportAction}
            />
          ))}

          <div className="page-button-bar">
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button"
                className="btn btn-dark"
                onClick={this.firstPage}>
                First
              </button>
              <button type="button"
                className="btn btn-secondary"
                onClick={this.prevPage}>
                Prev
              </button>
              <button type="button"
                className="btn btn-secondary"
                onClick={this.nextPage}>
                Next
              </button>
              <button type="button"
                className="btn btn-dark"
                onClick={this.lastPage}>
                Last
              </button>
            </div>
          </div>

        </div>

        <ReviewSubmit
          reviewSubmitTitle={this.state.reviewSubmitTitle}
          reviewSubmitContent={this.state.reviewSubmitContent}
          handleTitleChange={this.handleSubmitTitleChange}
          handleContentChange={this.handleSubmitContentChange}
          addReview={() => this.addReview()}
        />
      </div>
    )
  }
}

export default ReviewSection;