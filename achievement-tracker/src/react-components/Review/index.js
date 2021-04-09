import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css"

const log = console.log

class Review extends React.Component {
  state = {
    isCollapsed: this.props.content.length > 1000 ? true : false
  }
  
  setIsCollapsed = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    })
    log(this.props.content.length)
  }

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

        <button
          className="collapse-button"
          onClick={this.setIsCollapsed}
        >
          <strong>
            {this.state.isCollapsed ? "HIDE" : "SHOW"} CONTENT
          </strong>
        </button>
        <div
          className={this.state.isCollapsed ? "collapsed-content" : "expanded-content"}
        >
          <p>{content}</p>
        </div>

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