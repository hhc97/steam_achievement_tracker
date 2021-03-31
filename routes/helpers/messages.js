const { Chat } = require("../../models/chat")

async function storeMessage(socket, obj){
    try{
        const chatRoom = await Chat.findOne({UID: obj.id})
        chatRoom.messages.push(obj.data)
        chatRoom.save()
    }catch(error){
        console.log(erorr)
    }
}

module.exports = { storeMessage }