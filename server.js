// The main server file for the backend
"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const log = console.log;
const path = require('path')
const express = require("express");
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


/*** Session handling **************************************/
// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production
// Create a session and session cookie
app.use(session({
    secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000,
        httpOnly: true
    },
    // store the sessions on the database in production
    store: env === 'production' ? MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/steamTracker'
    }) : null
}));


/*** Webpage routes below **********************************/
app.use(require('./routes/login'))

// Serve the build
app.use(express.static(path.join(__dirname, "/achievement-tracker/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // send index.html
    res.sendFile(path.join(__dirname, "/achievement-tracker/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
