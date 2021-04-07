import React from "react";
import { uid } from "react-uid";
import "bootstrap/dist/css/bootstrap.min.css";

import { HeaderButton, HeaderImage, HeadContainer, HeaderNavBar } from '../HeaderComponent'
import logo from './../../logo.svg'
import ForumSearchBar from "../ForumSearchBar"
import Review from "../Review"
import ReviewSubmit from "../ReviewSubmit"
import "./styles.css"

import { addReview, getReviews, updateReviewVotes } from '../../actions/review'
import { addVoteRecord, getVoteRecords, updateVoteRecord } from '../../actions/voteRecord'

const log = console.log
const reviewNumLimit = 3;

class ReviewForum extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentUser: this.props.app.state.currentUser,
            searchContent: "",
            reviews: [],
            reviewsInSection: [],
            reviewsOnPage: [],
            currentPage: 1,
            reviewSubmitTitle: "",
            reviewSubmitContent: "",
            voteRecords: []
        }

        this.upvoteAction = this.upvoteAction.bind(this)
        this.downvoteAction = this.downvoteAction.bind(this)
        this.reportAction = this.reportAction.bind(this)
    }

    componentDidMount() {
        getReviews(this, reviewNumLimit)
        getVoteRecords(this)
    }

    upvoteAction = reviewId => {
        const user = this.state.currentUser
        log(user)
        if (user === null) {
            alert("You have to login before you vote.")
            return
        }

        log(this.state.voteRecords)
        const voteRecordSearch = this.state.voteRecords.filter(record => {
            return record.username === user && record.reviewId === reviewId
        })
        let voteRecord = {}
        if (voteRecordSearch.length === 0) {
            voteRecord = {
                username: user,
                reviewId: reviewId,
                vote: "none"
            }
            addVoteRecord(voteRecord)
            const newVoteRecords = this.state.voteRecords
            newVoteRecords.push(voteRecord)
            this.setState({
                voteRecords: newVoteRecords
            })
        } else {
            voteRecord = voteRecordSearch[0]
        }
        log(voteRecord)

        if (voteRecord.vote !== "upvote") {
            const reviewList = this.state.reviews.map(review => {
                if (review.id === reviewId) {
                    review.upvotes = review.upvotes + 1
                    if (voteRecord.vote === "downvote") {
                        review.downvotes = review.downvotes - 1
                    }
                }
                return review
            })
            voteRecord.vote = "upvote"

            this.setState({
                reviews: reviewList,
            })
        } else {
            const reviewList = this.state.reviews.map(review => {
                if (review.id === reviewId) {
                    review.upvotes = review.upvotes - 1
                }
                return review
            })
            voteRecord.vote = "none"

            this.setState({
                reviews: reviewList,
            })
        }

        // Update review in database
        updateReviewVotes(this.state.reviews[reviewId])
        // Update user's vote record in database
        updateVoteRecord(voteRecord)
    }

    downvoteAction = reviewId => {
        const user = this.state.currentUser
        if (!user) {
            alert("You have to login before you vote.")
            return
        }

        const voteRecordSearch = this.state.voteRecords.filter(record => {
            return record.username === user && record.reviewId === reviewId
        })
        let voteRecord = {}
        if (voteRecordSearch.length === 0) {
            voteRecord = {
                username: user,
                reviewId: reviewId,
                vote: "none"
            }
            addVoteRecord(voteRecord)
        } else {
            voteRecord = voteRecordSearch[0]
        }

        if (voteRecord.vote !== "downvote") {
            const reviewList = this.state.reviews.map(review => {
                if (review.id === reviewId) {
                    review.downvotes = review.downvotes + 1
                    if (voteRecord.vote === "upvote") {
                        review.upvotes = review.upvotes - 1
                    }
                }
                return review
            })
            voteRecord.vote = "downvote"

            this.setState({
                reviews: reviewList
            })
        } else {
            const reviewList = this.state.reviews.map(review => {
                if (review.id === reviewId) {
                    review.downvotes = review.downvotes - 1
                }
                return review
            })
            voteRecord.vote = "none"

            this.setState({
                reviews: reviewList
            })
        }

        // Update review in database
        updateReviewVotes(this.state.reviews[reviewId])
        // Update user's vote record in database
        updateVoteRecord(voteRecord)
    }

    reportAction = reviewId => {
        console.log("Report Review")

        const reviewList = this.state.reviews.map(review => {
            if (review.id === reviewId) {
                review.reported = true
            }
            return review
        })

        this.setState({
            reviews: reviewList
        })

        alert("Review reported.")
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

    addNewReview = () => {
        const user = this.state.currentUser
        log("add review!")
        if (!user) {
            alert("You have to login before you submit your review.")
            return
        } else if (this.state.reviewSubmitTitle === "") {
            alert("Review title cannot be empty")
            return
        } else if (this.state.reviewSubmitContent === "") {
            alert("Review content cannot be empty")
            return
        }

        const reviewList = this.state.reviews
        const newReview = {
            id: this.state.reviews.length,
            title: this.state.reviewSubmitTitle,
            content: this.state.reviewSubmitContent,
            upvotes: 0,
            downvotes: 0,
            author: this.state.currentUser,
            reputation: 1
        }
        reviewList.push(newReview)
        this.setState({
            reviewSubmitTitle: "",
            reviewSubmitContent: "",
            reviews: reviewList,
            reviewsInSection: reviewList,
            reviewsOnPage: reviewList.slice(
                (this.state.currentPage - 1) * reviewNumLimit,
                (this.state.currentPage - 1) * reviewNumLimit + reviewNumLimit
            )
        })

        // Update database
        addReview(newReview)
    }

    refreshForum = () => {
        const reviewList = this.state.reviews
        this.setState({
            reviewsInSection: reviewList,
            reviewsOnPage: reviewList.slice(
                0,
                reviewNumLimit
            ),
            searchContent: ""
        })
    }

    render() {
        return (
            <div>
                <HeadContainer bgId={"dashboard"}>
                    <HeaderNavBar>
                        {
                            this.state.currentUser !== null ?
                                <HeaderImage to='/dashboard' src={logo} /> :
                                <HeaderImage to='/' src={logo} />
                        }
                        <div className='group'>
                            <HeaderButton path='/reviewForum'>Forum</HeaderButton>
                            {
                                this.props.app.state.currentUser !== null ?
                                    <HeaderButton path='/Dashboard'>{this.state.currentUser}</HeaderButton> :
                                    <HeaderButton path='/Login'>Log In</HeaderButton>
                            }
                        </div>
                    </HeaderNavBar>
                </HeadContainer>

                <ForumSearchBar
                    searchContent={this.state.searchContent}
                    handleChange={this.handleSearchContentChange}
                    enterButton={this.searchReview}
                    refreshButton={this.refreshForum}
                />

                <div className="review-section">
                    <h1>Review Section</h1>

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
                    addReview={() => this.addNewReview()}
                />
            </div>
        )
    }
}

export default ReviewForum;