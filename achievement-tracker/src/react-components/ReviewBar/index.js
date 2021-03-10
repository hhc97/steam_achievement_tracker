import React from "react";

class ReviewBar extends React.Component {
  render() {
    const {
      id,
      title,
      content,
      author,
      reputation,
      deleteReview
    } = this.props;

    return (
      <div className="review">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="review-info-bar">
          <span><strong>Author: </strong>{author}</span>
          <span><strong>Reputation: </strong>{reputation}</span>
          <button type="button"
                  className="btn btn-secondary"
                  onClick={() => deleteReview(id)}>
              Delete
            </button>
        </div>
      </div>
    )
  }
}
export default ReviewBar;