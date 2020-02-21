module.exports = (app, knex, axios, CircularJSON) =>{
// get all currencyMetadata
app.get("/alldata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies?key=f18f5cd0afd42cbfd6f6359510d62ebc&attributes=original_symbol,name,website_url,logo_url,blog_url,discord_url,facebook_url,github_url,medium_url,reddit_url,telegram_url,twitter_url,youtube_url")
        .then((data) => {
            var maindata = CircularJSON.stringify(data);
            var parsedata = JSON.parse(maindata);
            var curr_data = parsedata.data;
            console.log(curr_data.length);
            // res.send(curr_data);
            for (let i = 0; i< 7444; i++) {
                knex('CurrenciesMetadata').insert(curr_data[i])
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
}