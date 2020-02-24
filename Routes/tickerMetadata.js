module.exports = (app, knex, axios, CircularJSON) => {
    // get all CurrencyTicker data;
    app.get("/tickerdata", (req, res) => {
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=" + process.env.api_key + "&attributes=currency,symbol,logo,rank,price,price_date,market_cap,circulating_supply,max_supply,high,high_timestamp")
            .then((result) => {
                var tickerdata = CircularJSON.stringify(result);
                var parsedata = JSON.parse(tickerdata);
                var ticdata = parsedata.data;
                // console.log(ticdata.length);
                // res.send(ticdata);

                let i = 0;
                var myfunc = setInterval(() => {
                    var other_dict = {}
                    for (const [key, value] of Object.entries(ticdata[i])){
                        if("id"==key) {
                            var private_id = value
                            other_dict["id"] = private_id

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
                            .then((data) =>{
                                console.log("7d done");
                            }).catch((err) =>{
                                console.log(err);
                            })

                        }else if("30d" == key){
                            value["id"] = private_id
                            knex('30d').insert(value)
                            .then((data) =>{
                                console.log("30 done")
                            })
                        }else if("365d" == key){
                            value["id"] = private_id
                            knex('365d').insert(value)
                            .then((data) =>{
                                console.log("365d done");
                            }).catch((err) =>{
                                console.log(err);
                            })
                        }else if("ytd" == key){
                            value["id"] = private_id
                            knex('ytd').insert(value)
                            .then((data) =>{
                                console.log("ytd done");
                            }).catch((err) =>{
                                console.log(err);
                            })
                        }else{
                            other_dict[key] = value
                        }
                    }
                    knex('CurrenciesTickerMetadata').insert(other_dict)
                    .then((data) =>{
                        console.log("Ticker data inserted successfully")
                    }).catch((err) =>{
                        console.log(err);
                    })
                    
                    console.log(i,"data inserted....")
                    i = i + 1;
                    if (i == ticdata.length) {
                        clearInterval(myfunc);
                    }
                }, 80)
                res.send(ticdata);

            }).catch((err) => {
                console.log(err);
            })
    })
}