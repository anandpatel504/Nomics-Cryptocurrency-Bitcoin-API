module.exports = (app, knex, axios, CircularJSON) =>{
// get all currencyMetadata
app.get("/alldata", (req, res) => {
    axios.get("https://api.nomics.com/v1/currencies?key="+ process.env.api_key +"&attributes=original_symbol,name,description,website_url,logo_url,blog_url,discord_url,facebook_url,github_url,medium_url,reddit_url,telegram_url,twitter_url,youtube_url")
        .then((data) => {
            var maindata = CircularJSON.stringify(data);
            var parsedata = JSON.parse(maindata);
            var curr_data = parsedata.data;
            // console.log(curr_data.length);
            // res.send(curr_data);

            // Here I'm iserting data inside the loop but it throw knex timeout
            // for (let i = 0; i< curr_data.length; i++) {
            //     knex('CurrenciesMetadata').insert(curr_data[i])
            //     .then((data) =>{
            //         console.log("done");
            //     }).catch((err) =>{
            //         console.log(err);
            //     })
            // }

            // data inserting inside setInterval function; 
            let i=0;
            var myfunc = setInterval (function(){
                knex('CurrenciesMetadata').insert(curr_data[i])
                .then((data) =>{
                }).catch((err) =>{
                    console.log(err);
                })
                console.log(i,"data inserted successfully.")
                i = i + 1;
                if(i==curr_data.length-1){
                    clearInterval(myfunc);
                }
            },1000/50);
            res.send({"success": curr_data})

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