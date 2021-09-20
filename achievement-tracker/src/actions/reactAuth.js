// Functions to help with user authentication

// environment configurations
import ENV from '../config.js'
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/current`;
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with the user to be logged in
export const login = (loginParams, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginParams),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 404) {
                alert('username or password incorrect')
            }
        })
        .then(json => {
            if (json && json.currentUser !== undefined) {
                app.setState({ currentUser: json.currentUser });
                localStorage.setItem('currentUser', json.currentUser)
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// Changes the current user's password
export const changePassword = (newPassword) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/changepassword`, {
        method: "post",
        body: JSON.stringify({ "newPassword": newPassword }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 201) {
                alert("password changed successfully")
            } else {
                alert('password change failed')
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
            localStorage.clear()
        })
        .catch(error => {
            console.log(error);
        });
};
