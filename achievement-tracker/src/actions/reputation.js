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