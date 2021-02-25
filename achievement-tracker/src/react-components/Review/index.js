import React from "react";

import "./styles.css"
import upvoteIcon from "./static/upvote_icon.png"
import downvoteIcon from "./static/downvote_icon.png"

class Review extends React.Component {
  render() {
    const {
      title,
      content,
      upvote,
      downvote,
      author,
      reputation
    } = this.props;

    const upvoteAction = () => {
      console.log("Upvote")
    }

    const downvoteAction = () => {
      console.log("Downvote")
    }

    return (
      <div className="review">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="review-info-bar">
          <span>
            <button>
              <img src={upvoteIcon} onClick={() => upvoteAction()}/>
              &nbsp;
              {upvote}
            </button>
          </span>
          <span>
            <button>
              <img src={downvoteIcon} onClick={() => downvoteAction()}/>
              &nbsp;
              {downvote}
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