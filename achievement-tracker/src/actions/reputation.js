import ENV from './../config.js'
const API_HOST = ENV.api_host

export const getReputation = (dashComp) => {
    const url = `${API_HOST}/api/user/reputation/${dashComp.state.userName}`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Error: Could not get reputation")
            }
        })
        .then(json => {
            dashComp.setState({ reputation: json.reputation })
        })
        .catch(error => {
            console.log(error);
        });
}

export const updateReputation = (page, reputation) => {
    const url = `${API_HOST}/api/user/updatereputation/${page.state.userName}`
    const username = page.state.userName
    const obj = {
        username: username,
        reputation: reputation
    }

    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                console.log("Reputation updated")
            } else {
                console.log("Error: Cannot update reputation")
            }
        }).catch((error) => {
            console.log(error)
        })
}