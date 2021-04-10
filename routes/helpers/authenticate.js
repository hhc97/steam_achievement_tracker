// helpers for authentication

const { User } = require('../../models/user')


module.exports = {
    // Middleware for authentication of resources
    ensureAuthenticated: (req, res, next) => {
        if (req.session.user) {
            User.findById(req.session.user).then((user) => {
                if (!user) {
                    return Promise.reject()
                } else {
                    req.user = user
                    next()
                }
            }).catch((error) => {
                res.status(401).send("Unauthorized")
            })
        } else {
            res.status(401).send("Unauthorized")
        }
    },
    // middleware for ensuring an admin is logged in
    ensureAuthenticatedAdmin: (req, res, next) => {
        if (req.session.user && req.session.username.toLowerCase().startsWith('admin')) {
            User.findById(req.session.user).then((user) => {
                if (!user) {
                    return Promise.reject()
                } else {
                    req.user = user
                    next()
                }
            }).catch((error) => {
                res.status(401).send("Unauthorized")
            })
        } else {
            res.status(401).send("Unauthorized")
        }
    }
}