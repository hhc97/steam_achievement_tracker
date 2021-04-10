const log = console.log
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const { User } = require('../models/user')
const { Chat } = require("../models/chat")
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { ensureAuthenticated } = require('./helpers/authenticate')

router.get("/api/friends/:userName", mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.params.userName

    try {
        const user = await User.findOne({ username: userName })
        if (!user) {
            res.status(400).send("Resource not found")
            return;
        }
        const friendList = user.friendList
        const pendingList = user.pendingFriendList
        res.send({ friendList: friendList, pendingList: pendingList })
    } catch (error) {
        log(error)
        res.status(500).send('Internal Server Error')
    }
})

router.post("/api/friends/:userName", mongoChecker, ensureAuthenticated, async (req, res) => {
    const friendName = req.body.friendName
    const userName = req.params.userName

    const newPendingFriend = {
        sender: userName,
        accepted: false
    }


    try {
        //check if friend user account exist
        const friendAccount = await User.findOne({ username: friendName })
        if (!friendAccount) {
            res.status(400).send("Resource not found")
            return;
        }

        //check if friend is repeated
        for (let i = 0; i < friendAccount.pendingFriendList.length; i++) {
            if (friendAccount.pendingFriendList[i].sender === userName) {
                res.status(400).send("Resource not found")
                return;
            }
        }
        friendAccount.pendingFriendList.push(newPendingFriend)
        const newFriendAccount = await friendAccount.save()
        //create chat room
        // newMessages.save()
        res.send(newFriendAccount)
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request')
        }
    }
})

router.delete("/api/friends/delete", mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.body.userName
    const friendName = req.body.friendName

    try {
        const user = await User.findOne({ username: userName })
        if (!user) {
            res.status(400).send("Resource not found")
            return;
        }
        const friendUser = await User.findOne({ username: friendName })
        if (!friendUser) {
            res.status(400).send("Resource not found")
            return;
        }
        const chatId = user.friendList.filter((i) => { return i.name == friendName })[0].chatRoomId
        const chat = await Chat.findOneAndDelete({ UID: chatId })
        user.friendList = user.friendList.filter((i) => { return i.name !== friendName })
        friendUser.friendList = friendUser.friendList.filter((i) => { return i.name !== userName })
        user.save()
        friendUser.save()
        res.send({ user: user, friendUser: friendUser, chat: chat })
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request')
        }
    }
})

router.patch("/api/friends/accept", mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.body.userName
    const friendName = req.body.friendName
    const id = crypto.randomBytes(16).toString("hex");
    const newFriend = {
        name: friendName,
        chatRoomId: id
    }
    const friendNewFriend = {
        name: userName,
        chatRoomId: id
    }
    const newMessages = new Chat({
        UID: id,
        messages: []
    })
    try {
        const user = await User.findOne({ username: userName })
        const friendUser = await User.findOne({ username: friendName })
        //delete from pending then add to real friend list
        user.pendingFriendList = user.pendingFriendList.filter(i => {
            return i.sender !== friendName
        })
        user.friendList.push(newFriend)
        friendUser.friendList.push(friendNewFriend)
        user.save()
        friendUser.save()
        newMessages.save()
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

router.patch("/api/friends/decline", mongoChecker, ensureAuthenticated, async (req, res) => {
    const userName = req.body.userName
    const friendName = req.body.friendName

    try {
        const user = await User.findOne({ username: userName })
        user.pendingFriendList = user.pendingFriendList.filter(i => {
            return i.sender !== friendName
        })
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