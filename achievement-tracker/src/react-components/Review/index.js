import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css"

class Review extends React.Component {
  render() {
    const {
      id,
      title,
      content,
      upvotes,
      downvotes,
      author,
      reputation,
      upvoteAction,
      downvoteAction,
      reportAction
    } = this.props;

    return (
      <div className="review">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="review-info-bar">
          <span>
            <button type="button"
              className="btn btn-success"
              onClick={() => upvoteAction(id)}>
              {upvotes}
            </button>
            <button type="button"
              className="btn btn-danger"
              onClick={() => downvoteAction(id)}>
              {downvotes}
            </button>
          </span>
          <span><strong>Author: </strong>{author}</span>
          <span><strong>Reputation: </strong>{reputation}</span>
          <button type="button"
            className="btn btn-secondary"
            onClick={() => reportAction(id)}>
            Report
            </button>
        </div>
      </div>
    )
  }
}

export default Review;