module.exports = (app, knex, axios, CircularJSON) =>{
// get all CurrencyTicker data;
app.get("/tickerdata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies/ticker?key="+ process.env.api_key +"&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
        .then((result) => {
            var tickerdata = CircularJSON.stringify(result);
            var parsedata = JSON.parse(tickerdata);
            var ticdata = parsedata.data;
            console.log(ticdata.length);;
            res.send(ticdata);

    // ticdata is coming in nested dict, so this type of data we can't insert in MySQL database. this type of data we can easily insert in NoSQL databases.
            // for (let i = 0; i< tickdata.length; i++) {
            //     knex('CurrenciesTickerMetadata').insert(ticdata[i])
            //     .then(() => console.log('done'))
            //     .catch(err => console.log(err));
            // }
        }).catch((err) => {
            console.log(err);
        })
})
}