const express = require("express");
const app = express();
const axios = require('axios');
const CircularJSON = require('circular-json');
app.use(express.json())

var knex = require('./models/database');

// const api_key = "f18f5cd0afd42cbfd6f6359510d62ebc";

// get all currencyMetadata
app.get("/alldata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies?key=f18f5cd0afd42cbfd6f6359510d62ebc&attributes=original_symbol,name,website_url,logo_url,blog_url,discord_url,facebook_url,github_url,medium_url,reddit_url,telegram_url,twitter_url,youtube_url")
        .then((data) => {
            // console.log(data.data.length);
            var maindata = CircularJSON.stringify(data);
            var parsedata = JSON.parse(maindata);
            var data_id = parsedata.data;
            console.log(data_id.length);
            // res.send(data_id);
            for (let i = 0; i< 7444; i++) {
                knex('CurrenciesMetadata').insert(data_id[i])
                .then(() => console.log('done'))
                .catch(err => console.log(err));
            }
        }).catch((err) => {
            console.log(err);
        })
})

// get all currencydata
app.get("/currencydata", (req, res) =>{
    knex.select('*').from('CurrenciesMetadata')
    .then((data) =>{
        res.send(data);
    }).catch((err) =>{
        console.log(err);
    })
})

// ================================= Second task =============================

// get all CurrencyTicker data;
app.get("/tickerdata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies/ticker?key=f18f5cd0afd42cbfd6f6359510d62ebc&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
        .then((result) => {
            // console.log(result.data.length);
            var tickerdata = CircularJSON.stringify(result);
            var parsedata = JSON.parse(tickerdata);
            var ticdata = parsedata.data;
            console.log(ticdata.length);
            res.send(ticdata);
            // for (let i = 0; i< 7000; i++) {
            //     knex('CurrenciesTickerMetadata').insert(ticdata[i])
            //     .then(() => console.log('done'))
            //     .catch(err => console.log(err));
            // }
        }).catch((err) => {
            console.log(err);
        })
})

// the port listener
var server = app.listen(3031, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("server is running on port.....");
    console.log(host, port);
})