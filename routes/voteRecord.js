const log = console.log
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { VoteRecord } = require('../models/voteRecord')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

/*** User API routes ****************/
router.post('/api/voteRecords', mongoChecker, async (req, res) => {
  const voteRecord = new VoteRecord({
    username: req.body.username,
    reviewId: req.body.reviewId,
		vote: req.body.vote
  })

  try {
    const result = await voteRecord.save()
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

router.get('/api/voteRecords', mongoChecker, async (req, res) => {
  try {
    const voteRecords = await VoteRecord.find()
    res.send({ voteRecords })
  } catch (error) {
    log(error)
    res.status(500).send("Internal Server Error")
  }
})

router.patch('/api/voteRecords/:username/:reviewId', mongoChecker, async (req, res) => {
	const username = req.params.username
	const reviewId = req.params.reviewId

	try {
		const voteRecord = await VoteRecord.findOne({username: username, reviewId: reviewId})
		if (!voteRecord) {
			res.status(404).send()
		} else {
			voteRecord.vote = req.body.vote
			voteRecord.save()
			res.send(voteRecord)
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

module.exports = router;