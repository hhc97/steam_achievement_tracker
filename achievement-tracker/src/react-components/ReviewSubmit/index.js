import React from "react";

import "./styles.css"

class ReviewSubmit extends React.Component {
  render() {
    const {
      reviewSubmitTitle,
      reviewSubmitContent,
      handleTitleChange,
      handleContentChange,
      addReview
    } = this.props;

    return (
      <div className="review-submit">
        <h2>Write Your Review</h2>
        <input name="reviewSubmitTitle"
          className="review-submit-title-box"
          value={reviewSubmitTitle}
          type="text"
          placeholder="Review Title"
          onChange={handleTitleChange}
          label="reviewSubmitTitle"
        />
        <textarea name="reviewSubmitContent"
          className="review-submit-content-box"
          value={reviewSubmitContent}
          type="text"
          placeholder="Review Content"
          onChange={handleContentChange}
          label="reviewSubmitContent"
        />
        <input type="submit"
          className="review-submit-button"
          value="Submit"
          onClick={addReview}
        />
      </div>
    )
  }
}

export default ReviewSubmit;