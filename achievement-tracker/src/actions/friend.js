
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
            for (let i = 0; i < json.length; i++){
                list.push(json[i].name)
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
                const newFriendList = dashboardComp.state.friendList
                newFriendList.push(friendName)
                dashboardComp.setState({
                    friendList: newFriendList
                });
                alert("Success: Adding a friend.")
            } else {
                alert("Error: Friend does not exist or its already your friend");
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

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                let newFriendList = dashboardComp.state.friendList
                newFriendList = newFriendList.filter((i) => {return i !== friendName})
                dashboardComp.setState({
                    friendList: newFriendList
                });
                alert("Success: delete a friend.")
            }else {
                alert("Error");
            }
        })
}