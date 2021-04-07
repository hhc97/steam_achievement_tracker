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

router.patch('/api/reviews/:id', mongoChecker, async (req, res) => {
  const id = req.params.id

	try {
		const review = await Review.findOne({id: id})
		if (!review) {
			res.status(404).send()
		} else {
			review.upvotes = req.body.upvotes
			review.downvotes = req.body.downvotes
			review.save()
			res.send(review)
		}
	} catch (error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

router.delete('/api/reviews/:id', mongoChecker, async (req, res) => {
	const id = req.params.id

	try {
		const review = await Review.findByIdAndRemove(id)
		if (!review) {
			res.status(404).send()
		} else {   
			res.send(review)
		}
	} catch(error) {
		log(error)
		res.status(500).send()
	}
})

module.exports = router