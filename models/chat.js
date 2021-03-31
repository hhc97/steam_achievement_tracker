/* User model */
'use strict';

const mongoose = require('mongoose')

// a schema to store messages
const MessageSchema = new mongoose.Schema({
    name: String,
    content: String,
    time : Date
}
)

// UID to identified, same in the chatRoomUID in friendSchema
const chatRoom = new mongoose.Schema({
    UID: String,
    messages: [MessageSchema]
})


// make a model using the User schema
const Chat = mongoose.model('chat', chatRoom)
module.exports = { Chat }
