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
    let timezone = req.query.timezone;
    console.log(timezone);
    let rawdata = fs.readFileSync('./ne_10m_time_zones.geojson');
    let jsonObject = JSON.parse(rawdata);
    console.log("length "+jsonObject.features.length);
    let index=0;
    let output=[];
    for(index=0;index<jsonObject.features.length;index++){
       //console.log(jsonObject.features[index].properties.zone);
    if(jsonObject.features[index].properties.zone==timezone)
    {
        output.push(jsonObject.features[index].geometry.coordinates[0]);
    }
}
    res.json({"output": output});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});