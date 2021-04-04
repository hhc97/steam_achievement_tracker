import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getMessages = async (chatComp, userName, friendName) => {
    const url = `${API_HOST}/api/chat/${userName}/${friendName}`

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("cannot fetch request")
            }
        })
        .then(json => {
            chatComp.setState({ messages: json.messages, chatRoomId: json.id })
        })
        .catch(error => {
            console.log(error);
        });
}