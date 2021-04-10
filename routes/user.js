const log = console.log
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { ensureAuthenticatedAdmin } = require('./helpers/authenticate')

/*** User API routes ****************/
router.get('/api/users', mongoChecker, ensureAuthenticatedAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.send({ users })
    } catch (error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.delete('/api/users/:username', mongoChecker, ensureAuthenticatedAdmin, async (req, res) => {
    const username = req.params.username

    try {
        const user = await User.findOneAndDelete({ username: username })
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    } catch (error) {
        log(error)
        res.status(500).send()
    }
})

module.exports = router