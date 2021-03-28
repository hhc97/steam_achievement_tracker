#!/bin/bash
if  [[ $1 = "-f" ]]; then
    echo "Wiping mongo database and running a fresh instance"
    cd achievement-tracker
    npm install
    npm run build
    cd ..
    npm install
    rm -rf mongo-data
    mkdir mongo-data
    mongod --quiet --dbpath mongo-data &
    node server.js
else
    echo "Starting server with any old data intact, use option '-f' to remove all old data"
    cd achievement-tracker
    npm install
    npm run build
    cd ..
    npm install
    mkdir -p mongo-data
    mongod --quiet --dbpath mongo-data &
    node server.js
fi
