module.exports = (app, knex, axios, CircularJSON) =>{
// get all CurrencyTicker data;
app.get("/tickerdata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies/ticker?key=f18f5cd0afd42cbfd6f6359510d62ebc&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
        .then((result) => {
            // console.log(result.data.length);
            var tickerdata = CircularJSON.stringify(result);
            var parsedata = JSON.parse(tickerdata);
            var ticdata = parsedata.data;
            // console.log(ticdata);
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
}