const log = console.log

export const getUsersOnAdmin = (adminPage) => {
    const url = '/api/users'

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            } else {
                log('Error: Cannot get users')
            }
        })
        .then((json) => {
            const users = json.users.filter(user => {
                return !user.username.startsWith("admin")
            })
            adminPage.setState({
                users: users,
                usersOnPage: users
            })
        })
        .catch((error) => {
            log(error)
        })
}

export const deleteUserOnAdmin = (user) => {
    const url = `/api/users/${user.username}`

    const request = new Request(url, {
        method: 'delete',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
        .then(function (res) {
            if (res.status === 200) {
                log("User deleted")
            } else {
                log("Error: Cannot delete user")
            }
        }).catch((error) => {
            log(error)
        })
}