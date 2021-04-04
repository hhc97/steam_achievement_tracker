const log = console.log
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { Review } = require('../models/review')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

/*** User API routes ****************/
router.post('/api/reviews', mongoChecker, async (req, res) => {
  const review = new Review({
    username: req.body.username,
    password: req.body.password,
    steamName: req.body.steamName,
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    upvotes: req.body.upvotes,
    downvotes: req.body.downvotes,
    author: req.body.author,
    reputation: req.body.reputation,
    reported: req.body.reported
  })

  try {
    const result = await review.save()
    res.send(result)
  } catch (error) {
    if (isMongoError(error)) {
      res.status(500).send('Internal server error')
    } else {
      log(error)
      res.status(400).send('Bad Request')
    }
  }
})

router.get('/api/reviews', mongoChecker, async (req, res) => {
  try {
    const reviews = await Review.find()
    res.send({ reviews })
  } catch (error) {
    log(error)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router