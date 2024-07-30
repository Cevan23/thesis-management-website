const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// just allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// using express.json() to parse incoming requests with JSON payloads
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:')); // log any errors with connect db
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const external_loginRoutes=require('./routes/external');
app.use('/external',external_loginRoutes);

const professorRoutes=require('./routes/professor');
app.use('/professor',professorRoutes);

const universityRoutes = require('./routes/university');
app.use('/university',universityRoutes);

module.exports = app;