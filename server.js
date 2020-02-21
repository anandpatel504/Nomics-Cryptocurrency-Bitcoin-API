const express = require("express");
const app = express();
const axios = require('axios');
const CircularJSON = require('circular-json');
app.use(express.json())

var knex = require('./models/database');
const api_key = process.env.api_key;

// Task-1
// route to currencyMetadata.js
var currencyMetadata = express.Router();
app.use("/", currencyMetadata);
require("./Routes/currencyMetadata")(currencyMetadata, knex, axios, CircularJSON);

// Task-2
// route to tickerMetadata.js
var tickerMetadata = express.Router();
app.use("/", tickerMetadata);
require("./Routes/tickerMetadata")(tickerMetadata, knex, axios, CircularJSON);

// the port listener
var server = app.listen(3031, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server is running on port.....");
    console.log(host, port);
})
