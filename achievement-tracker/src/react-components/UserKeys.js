// USAGE:
// First import this at the top of your module:
// import UserKeys from '../UserKeys.js'

// Then call the functions inside by doing:
// const username = UserKeys.getCurrUser()


const UserKeys = {
    user: 'user',
    isAdmin: 'admin_status',
    logOut: () => {
        localStorage.clear()
    },
    getCurrUser: () => {
        return localStorage.getItem(UserKeys.user)
    },
    getCurrUserAdminStatus: () => {
        return localStorage.getItem(UserKeys.isAdmin)
    }
}

export default UserKeys
