const express = require('express');
const router = express.Router();
const { User } = require('../models/user')
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");


router.get("/api/user/reputation/:userName", mongoChecker, async (req, res) => {
    const userName = req.params.userName

    try {
        const user = await User.findOne({ username: userName })
        if (!user) {
            res.status(400).send("Resource not found")
            return;
        }
        res.send({ reputation: user.reputation })
    } catch (error) {
        log(error)
        res.status(500).send('Internal Server Error')
    }
})

router.patch("/api/user/updatereputation/:username", mongoChecker, async (req, res) => {
    const username = req.body.username
    const newReputation = req.body.reputation

    try {
        const user = await User.findOne({ username: username})
        user.reputation = newReputation
        user.save()
        res.send()
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