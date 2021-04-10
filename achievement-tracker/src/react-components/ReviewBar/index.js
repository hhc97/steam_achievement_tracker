import React from "react";

class ReviewBar extends React.Component {
  render() {
    const {
      id,
      title,
      content,
      author,
      reputation,
      reported,
      cancelReport,
      deleteReview
    } = this.props;

    return (
      <div className="review">
        <h2>{title}</h2>
        <p className="review-content">{content}</p>
        <div className="review-info-bar">
          <span><strong>Author: </strong>{author}</span>
          <span><strong>Reputation: </strong>{reputation}</span>
          <button type="button"
                  className="btn btn-danger"
                  onClick={() => deleteReview(id)}>
              Delete Review
          </button>
          { 
            reported ? 
            <button type="button"
                    className="btn btn-warning"
                    onClick={() => cancelReport(id)}>
              Cancel Report
            </button> : 
            <span></span>
          }
        </div>

      </div>
    )
  }
}
export default ReviewBar;