// steam API query routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router
const request = require('request')


/*** User API routes ****************/
// route to get user info from steam's API
router.get('/steamapi/userinfo', async (req, res) => {
    const key = req.query.key
    const userid = req.query.steamids

    const options = {
        uri: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${userid}`,
        method: 'GET'
    }

    request(options, function (err, steam_res) { res.send(steam_res.body) })
})

// route to get user games info from steam's API
router.get('/steamapi/usergames', async (req, res) => {
    const key = req.query.key
    const userid = req.session.steamID

    const options = {
        uri: `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${userid}
        &include_appinfo=true&include_played_free_games=true`,
        method: 'GET'
    }

    request(options, function (err, steam_res) { res.send(steam_res.body) })
})

// route to get a specific game's stats
router.get('/steamapi/games/', async (req, res) => {
    const key = req.query.key
    const appid = req.query.appid
    const userid = req.session.steamID

    const options = {
        uri: `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/?key=${key}&steamid=${userid}
        &appid=${appid}`,
        method: 'GET'
    }

    request(options, function (err, steam_res) { res.send(steam_res.body) })
})

// route to get a specific game's neutral achievement info
router.get('/steamapi/game/', async (req, res) => {
    const key = req.query.key
    const appid = req.query.appid

    const options = {
        uri: `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v1/?key=${key}&appid=${appid}`,
        method: 'GET'
    }

    request(options, function (err, steam_res) { res.send(steam_res.body) })
})

// export the router
module.exports = router
