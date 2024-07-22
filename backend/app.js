const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// just allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));
// using express.json() to parse incoming requests with JSON payloads
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); // log any errors with connect db
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const external_loginRoutes=require('./routes/external');
app.use('/external',external_loginRoutes);

module.exports = app;