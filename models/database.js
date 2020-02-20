
var knex = require('knex')({
    client: "mysql",
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'anandbabu',
        database: 'currencydata'
    }
})

// Create CurrenciesMetadata table
knex.schema.createTable('CurrenciesMetadata', function (table) {
    table.text('original_symbol')
    table.text('name');
    table.text('description', 55000);
    table.text('website_url');
    table.text('logo_url');
    table.text('blog_url');
    table.text('discord_url');
    table.text('facebook_url');
    table.text('github_url');
    table.text('medium_url');
    table.text('reddit_url');
    table.text('telegram_url');
    table.text('twitter_url');
    table.text('youtube_url');

}).then(() => {
    console.log("CurrenciesMetadata table created successfully....")
}).catch(() => {
    console.log("CurrenciesMetadata table is already exists!");
})

// Create CurrenciesTickerMetadata table
knex.schema.createTable('CurrenciesTickerMetadata', function (table) {
    table.string('id');
    table.string('currency');
    table.string('symbol');
    table.string('logo');
    table.string('rank');
    table.string('price');
    table.string('price_date');
    table.string('market_cap');
    table.string('circulating_supply');
    table.string('max_supply');
    table.string('high');
    table.string('high_timestamp');
    table.string('1d');
    table.string('7d');
    table.string('30d');
    table.string('365d');

}).then(() => {
    console.log("CurrenciesTickerMetadata table created successfully....")
}).catch(() => {
    console.log("CurrenciesTickerMetadata table is already exists!");
})

module.exports = knex;
