// Functions to help with accessing the steam API

// environment configurations
import ENV from '../config.js'
const API_HOST = ENV.api_host
const STEAM_KEY = ENV.steam_key

// returns the game stats for a user
export const getGameStats = () => {
    const url = `${API_HOST}/steamapi/usergames/?key=${STEAM_KEY}`;
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            return json.response
        })
        .catch(error => {
            console.log(error);
        });
}

// returns the game stats for a specific game
export const getAchievementStats = (appid) => {
    const url = `${API_HOST}/steamapi/games/?key=${STEAM_KEY}&appid=${appid}`;
    return fetch(url)
        .then(res => {
            return res.json();
        })
        .then(json => {
            return json.playerstats
        })
        .catch(error => {
            console.log(error);
        });
}

// returns the game achievement schema for a specific game
export const getGameSchema = (appid) => {
    const url = `${API_HOST}/steamapi/game/?key=${STEAM_KEY}&appid=${appid}`;
    return fetch(url)
        .then(res => {
            return res.json();
        })
        .then(json => {
            return json.game.availableGameStats.achievements
        })
        .catch(error => {
            console.log(error);
        });
}