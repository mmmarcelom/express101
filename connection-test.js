require('dotenv').config();

const connection = require('./connection')

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});