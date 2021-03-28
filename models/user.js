/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// a schema to store messages
const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    content: String
},
    {
        timestamps: true
    }
)

// schema for storing a friend, and the messages with that friend
const FriendSchema = new mongoose.Schema({
    name: String,
    messages: [MessageSchema]
})


// the schema for a user
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    steamName: {
        type: String,
        required: true,
        unique: true,
        immutable: true
        // validate against steam api?
    },
    friendList: [FriendSchema],
    signUpTime: {
        type: Date,
        required: true,
        immutable: true,
        default: Date.now()
    }
})

// check if we need to hash the password upon saving
UserSchema.pre('save', function (next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function (username, password) {
    const User = this // binds this to the User model

    // First find the user by their username
    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()  // a rejected promise
        }
        // if the user exists, make sure their password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
