const mongoose = require('mongoose')

const VoteRecord = mongoose.model('VoteRecord', {
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  reviewId: {
    type: Number,
    required: true
  },
  vote: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = { VoteRecord }