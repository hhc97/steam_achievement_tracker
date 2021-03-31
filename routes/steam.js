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

// export the router
module.exports = router
