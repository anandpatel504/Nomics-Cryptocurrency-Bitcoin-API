module.exports = (app, knex, axios, CircularJSON) => {
    // get all CurrencyTicker data;
    app.get("/tickerdata", (req, res) => {
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=" + process.env.api_key + "&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
            .then((result) => {
                var tickerdata = CircularJSON.stringify(result);
                var parsedata = JSON.parse(tickerdata);
                var ticdata = parsedata.data;
                console.log(ticdata.length);
                // res.send(ticdata);
                
                for (var i = 0; i< ticdata.length; i++) {
                    var ticker_meta_data = ticdata[i];
                    knex ('CurrenciesTickerMetadata').insert ({
                        "currency": ticker_meta_data.currency,
                        "symbol": ticker_meta_data.symbol,
                        "logo_url": ticker_meta_data.logo_url,
                        "rank": ticker_meta_data.rank,
                        "price": ticker_meta_data.price,
                        "price_date": ticker_meta_data.price_date,
                        "market_cap": ticker_meta_data.market_cap,
                        "circulating_supply": ticker_meta_data.circulating_supply,
                        "max_supply": ticker_meta_data.max_supply,
                        "high": ticker_meta_data.high,
                        "high_timestamp": ticker_meta_data.high_timestamp
                    }).then(() => {
                        console.log("Data inserted successfully!")
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
    })

    //Here I'm inserting interval value data in his own table;
   app.get("/interval_value", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies/ticker?key=" + process.env.api_key + "&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
        .then((result) => {
            var tickerdata = CircularJSON.stringify(result);
            var parsedata = JSON.parse(tickerdata);
            var ticdata = parsedata.data;
         
            let i = 0;
            var myfunc = setInterval(() => {
                for (const [key, value] of Object.entries(ticdata[i])){
                    if("id"==key) {
                        var private_id = value
                        
                    }else if("1d"==key){
                        value["id"] = private_id
                        knex('1d').insert(value)
                        .then((data) =>{
                            console.log("1d done!")
                        }).catch((err) =>{
                            console.log(err);
                        })

                    }else if("7d"==key){
                        value["id"] = private_id
                        knex('7d').insert(value)
                        .then(() =>{
                            console.log("7d done");
                        }).catch((err) =>{
                            console.log(err);
                        })

                    }else if("30d" == key){
                        value["id"] = private_id
                        knex('30d').insert(value)
                        .then(() =>{
                            console.log("30 done")
                        })
                    }else if("365d" == key){
                        value["id"] = private_id
                        knex('365d').insert(value)
                        .then(() =>{
                            console.log("365d done");
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }else if("ytd" == key){
                        value["id"] = private_id
                        knex('ytd').insert(value)
                        .then(() =>{
                            console.log("ytd done");
                        }).catch((err) =>{
                            console.log(err);
                        })
                    }
                }
                console.log(i,"data inserted....")
                i = i + 1;
                if (i == ticdata.length) {
                    clearInterval(myfunc);
                }
            }, 80)
            // res.send(ticdata);

        }).catch((err) => {
            console.log(err);
        })
})

    // By using this endpoind you can get data according to their rank;
    app.get("/rank", (req, res) => {
        knex.select("rank", "price", "price_date", "market_cap", "circulating_supply", "max_supply", "high", "high_timestamp")
        .from("CurrenciesTickerMetadata")
        .orderBy("rank")
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
            res.send(
                {"Error": "please check your CurrenciesTickerMetadata table!"}
            )
        })
    })

    //get data according to user input like:- rank/price/price_date/market_cap
    app.get("/ticdata/:item", (req, res) => {
        let item = req.params.item;
        knex.select("rank", "price", "price_date", "market_cap")
        .from("CurrenciesTickerMetadata")
        .orderBy(item)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
        })
    })

    //get data according to user input like:- 1d/7d/30d/365d/ytd;
    app.get("/byday/:input", (req, res) => {
        let input = req.params.input;
        knex.select("price_change", "price_change_pct", "volume", "volume_change", "volume_change_pct", "market_cap_change", "market_cap_change_pct")
        .from(input)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err);
            res.send(
                {"Error": "Please check your input!"}
            )
        })
    })
}