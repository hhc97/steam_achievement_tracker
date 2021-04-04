const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0
  },
  downvotes: {
    type: Number,
    required: true,
    default: 0
  },
  author: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    default: "Unknown"
  },
  reputation: {
    type: Number,
    required: true,
    default: 1
  },
  reported: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = { Review }