/* React environment configuration (frontend only) */
// Do not store any sensitive data/secret values/API keys here - it is available in the browser to anyone.


const prod = {
    env: 'production',
    api_host: '', // an empty string to signify a relative path. can also put a deployment URL.
    steam_key: ''
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000', // web server localhost port
    steam_key: ''
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;