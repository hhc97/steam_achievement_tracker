cd achievement-tracker
npm install
npm run build
cd ..
npm install
mkdir -p mongo-data
mongod --quiet --dbpath mongo-data &
node server.js
