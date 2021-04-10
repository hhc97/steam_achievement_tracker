const log = console.log
const express = require('express');
const router = express.Router();

const { User } = require('../models/user')
const { Chat } = require('../models/chat')
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { ensureAuthenticated } = require('./helpers/authenticate')

router.get("/api/chat/:userName/:friendName", mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.params.userName
    const friendName = req.params.friendName


    try {
        //find user
        const user = await User.findOne({ username: userName })

        if (!user) {
            res.status(400).send("Resource not found")
            return;
        }

        //find friend and room id
        let id = undefined;
        for (let i = 0; i < user.friendList.length; i++) {
            if (user.friendList[i].name === friendName) {
                id = user.friendList[i].chatRoomId
            }
        }
        if (id === undefined) {
            res.status(400).send("Resource not found")
            return;
        }
        // //find messages
        const chatRoom = await Chat.findOne({ UID: id })
        if (!chatRoom) {
            res.status(400).send("Resource not found")
            return;
        }
        const messages = chatRoom.messages
        if (messages.length == 0) {
            res.send({ messages: messages, id: id })
        } else {
            messages.sort((a, b) => { return a.time - b.time })
            res.send({ messages: messages, id: id })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router