
// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
//console.log('Current environment:', ENV.env)

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each student
export const getFriend = (friendList) => {
    // currently use leo as userName to test, will be pass in ${friendList.userName}.
    const url = `${API_HOST}/api/friends/${friendList.state.userName}`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get friendList");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            let list = []
            for (let i = 0; i < json.friendList.length; i++) {
                list.push({ name: json.friendList[i].name, onPending: false })
            }
            for (let i = 0; i < json.pendingList.length; i++) {
                list.push({ name: json.pendingList[i].sender, onPending: true })
            }
            friendList.setState({ friendList: list });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a POST request with a new student
export const addFriends = async (dashboardComp) => {
    // the URL for the request
    const url = `${API_HOST}/api/friends/${dashboardComp.state.userName}`;
    // Create our request constructor with all the parameters we need
    //reqeust obj
    const friendName = dashboardComp.state.addFriendName
    const obj = {
        friendName: friendName
    }
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                // const newFriendList = dashboardComp.state.friendList
                // newFriendList.push(friendName)
                // dashboardComp.setState({
                //     friendList: newFriendList
                // });
                //alert("Success: Waiting for your friend to accept.")
            } else {
                alert("Error: Friend does not exist or its pending");
            }
        })
};


export const deleteFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/delete`;
    const obj = {
        userName: dashboardComp.state.userName,
        friendName: friendName
    }

    const request = new Request(url, {
        method: "delete",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                let newFriendList = dashboardComp.state.friendList
                newFriendList = newFriendList.filter((i) => { return i.name !== friendName })
                dashboardComp.setState({
                    friendList: newFriendList
                });
            } else {
                alert("Error");
            }
        })
}

export const acceptFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/accept`;
    const obj = {
        userName: dashboardComp.state.userName,
        friendName: friendName
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                let newFriendList = dashboardComp.state.friendList
                for (let i = 0; i < newFriendList.length; i++) {
                    if (newFriendList[i].name === friendName) {
                        newFriendList[i].onPending = false
                    }
                }
                dashboardComp.setState({
                    friendList: newFriendList
                });
            } else {
                alert("Error");
            }
        })
}

export const declineFriend = async (dashboardComp, friendName) => {
    const url = `${API_HOST}/api/friends/decline`;
    const obj = {
        userName: dashboardComp.state.userName,
        friendName: friendName
    }

    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                let newFriendList = dashboardComp.state.friendList
                newFriendList = newFriendList.filter(i => { return i.name !== friendName })
                dashboardComp.setState({
                    friendList: newFriendList
                });
            } else {
                alert("Error");
            }
        })
}