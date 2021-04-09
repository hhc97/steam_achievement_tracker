// User routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

/*** User API routes ****************/
router.post('/users', mongoChecker, async (req, res) => {

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        steamName: req.body.steamName,
        friendList: []
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request')
        }
    }
})

// middleware for getting a user
async function getUser(req, res, next) {
    let usr
    try {
        usr = await User.findOne({ username: req.params.username })
        if (usr == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.user = usr
    next()
}

// middleware for getting the current logged in user
async function getLoggedInUser(req, res, next) {
    let usr
    try {
        usr = await User.findOne({ username: req.session.username })
        if (usr == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    req.user = usr
    next()
}

// route to change a users password
// using post because patch is fucking retarded
router.post('/users/changepassword', mongoChecker, getLoggedInUser, async (req, res) => {
    let user = req.user
    try {
        user.password = req.body.newPassword
        await user.save()
        res.status(201).json({ user: user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// route to get a users creation time
router.get('/users/joindate/:username', mongoChecker, getUser, async (req, res) => {
    res.json({ time: req.user.signUpTime })
})

// route to get a user by their username, useful for checking if a username exists
router.get('/usernames/:username', mongoChecker, getUser, async (req, res) => {
    // if we reach here, then our middleware found a user, so send a 200
    res.status(200).send()
})


/*** Login and Logout routes ***/
// A route to login and create a session
router.post('/users/login', mongoChecker, async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        // Use the static method on the User model to find a user
        // by their username and password.
        const user = await User.findByUsernamePassword(username, password);
        if (!user) {
            res.send({
                currentUID: '',
                currentUser: ''
            })
        } else {
            // Add the user's id and email to the session.
            // We can check later if the session exists to ensure we are logged in.
            req.session.user = user._id
            req.session.username = user.username
            req.session.steamID = user.steamName
            res.send({
                currentUID: req.session.user,
                currentUser: req.session.username
            })
        }
    } catch (error) {
        // redirect to login if can't login for any reason
        if (isMongoError(error)) {
            res.status(500).redirect('/login');
        } else {
            // if it is not a mongo error, then the user was not found
            res.status(404).send()
        }
    }

})

// route for checking the current session
router.get('/users/current', (req, res) => {
    if (req.session.user) {
        res.json({
            currentUID: req.session.user,
            currentUser: req.session.username
        })
    } else {
        res.status(401).send()
    }
})

// A route to logout a user
router.get('/users/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.redirect('/')
        }
    })
})

// export the router
module.exports = router
