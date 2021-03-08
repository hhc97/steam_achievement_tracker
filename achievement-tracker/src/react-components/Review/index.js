import React from "react";

import "./styles.css"
import upvoteIcon from "./static/upvote_icon.png"
import downvoteIcon from "./static/downvote_icon.png"

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
      downvoteAction
    } = this.props;

    return (
      <div className="review">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="review-info-bar">
          <span>
            <button>
              <img src={upvoteIcon} onClick={() => upvoteAction(id)}/>
              &nbsp;
              {upvotes}
            </button>
          </span>
          <span>
            <button>
              <img src={downvoteIcon} onClick={() => downvoteAction(id)}/>
              &nbsp;
              {downvotes}
            </button>
          </span>
          <span><strong>Author: </strong>{author}</span>
          <span><strong>Reputation: </strong>{reputation}</span>
        </div>
      </div>
    )
  }
}

export default Review;