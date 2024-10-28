const mongoose = require('mongoose');

// define mongodb url connection
const mongoURL = 'mongodb://localhost:27017/hotels';

// setup mongodb connection 
// mongoose.connect(mongoURL);

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// define event listeners for database conncetions
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected To MongoDB Server');
})

db.on('error', (err) => {
  console.log('MongoDB Server error', err);
})

db.on('Disconnected', () => {
  console.log('MongoDB Server Disconnected');

});


// MongoDB Module Exports
module.exports = db;