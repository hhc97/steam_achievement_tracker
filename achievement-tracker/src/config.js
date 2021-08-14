/* React environment configuration (frontend only) */
// Do not store any sensitive data/secret values/API keys here - it is available in the browser to anyone.


const API_HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'

async function getKey() {
    const url = `${API_HOST}/steamapi/apikey/`;
    return fetch(url)
        .then(res => {
            return res.text();
        })
        .then(text => {
            return text
        })
        .catch(error => {
            console.log(error);
        });
}

const prod = {
    env: 'production',
    api_host: API_HOST, // an empty string to signify a relative path. can also put a deployment URL.
    steam_key: await getKey()
};
const dev = {
    env: 'development',
    api_host: API_HOST, // web server localhost port
    steam_key: await getKey()
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;