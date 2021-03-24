/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const Message = new mongoose.Schema({
	name: String,
	content: String
})

const Friend = new mongoose.Schema({
    name: String,
    messages: [Message]
})


const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		minlength: 1,
		unique: true,
	},

	password: {
		type: String,
		required: true,
		minlength: 6
	},

	friendList: [Friend]
})

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }

