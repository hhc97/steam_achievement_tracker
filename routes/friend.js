const log = console.log
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const { User } = require('../models/user')
const { Chat } = require("../models/chat")
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

router.get("/api/friends/:userName", mongoChecker, async (req, res) => {
    const userName = req.params.userName

    try{
        const user = await User.findOne({username: userName})
        if(!user){
            res.status(400).send("Resource not found")
            return;
        }
        const friendList = user.friendList
        res.send(friendList)
    }catch(error){
        log(error)
		res.status(500).send('Internal Server Error')
    }
})

router.post("/api/friends/:userName", mongoChecker, async (req, res) => {
    const friendName = req.body.friendName
    const userName = req.params.userName
    const id = crypto.randomBytes(16).toString("hex");

    const newFriend = {
        name: friendName,
        chatRoomId: id
    }
    // add user to other person's friendlsit
    const userFriend = {
        name: userName,
        chatRoomId: id
    }

    const newMessages = new Chat({
        UID : id,
        messages: []
    })

    try{    
        //check if friend user account exist
        const friendAccount = await User.findOne({username: friendName})
        if(!friendAccount){
            res.status(400).send("Resource not found")
            return;
        }
        //check if current user exist
        const user = await User.findOne({username: userName})
        if(!user){
            res.status(400).send("Resource not found")
            return;
        }
        //check if friend is repeated
        for (let i = 0; i < user.friendList.length; i++){
            if (user.friendList[i].name === friendName){
                res.status(400).send("Resource not found")
                return;
            }
        }
        user.friendList.push(newFriend)
        friendAccount.friendList.push(userFriend)
        const newUser = await user.save()
        const newFriendAccount = await friendAccount.save()
        //create chat room
        newMessages.save()


        res.send({newUser: newUser, newFriendAccount: newFriendAccount})
    }catch(error){
        if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
            log(error)
			res.status(400).send('Bad Request')
		}
    }
})


module.exports = router