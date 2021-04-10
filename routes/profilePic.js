const express = require('express');
const router = express.Router();
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { User } = require('../models/user');
const { ensureAuthenticated } = require('./helpers/authenticate')

router.get('/api/image/:userName', mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.params.userName

    try {
        const user = await User.findOne({ username: userName })
        if (!user) {
            res.status(400).send("Resource not found")
            return
        }
        const image = user.profilePic
        res.send({ image: image })
    } catch (error) {
        log(error)
        res.status(500).send('Internal Server Error')
    }
})

router.patch('/api/uploadImage/:userName', mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.params.userName
    const image = req.body.image

    try {
        const user = await User.findOne({ username: userName })
        user.profilePic = image
        const result = user.save()
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

module.exports = router