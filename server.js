'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"output": "server is working"});
});
app.get('/timezone', (req, res) => {
    let rawdata = fs.readFileSync('./world.geojson');
    let jsonObject = JSON.parse(rawdata);
//    console.log("length "+jsonObject.features.length);
    res.header('Access-Control-Allow-Origin', '*');
    res.json({"output": jsonObject.features});
});
// listen for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});