const env = require('dotenv').config()
console.log(process.env.host);

var knex = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
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
    table.string('currency');
    table.string('symbol');
    table.string('logo_url');
    table.integer('rank');
    table.integer('price');
    table.string('price_date');
    table.integer('market_cap');
    table.string('circulating_supply');
    table.string('max_supply');
    table.integer('high');
    table.string('high_timestamp');

}).then(() => {
    console.log("CurrenciesTickerMetadata table created successfully....")
}).catch(() => {
    console.log("CurrenciesTickerMetadata table is already exists!");
})

// Create 1d table
knex.schema.createTable('1d', function (table) {
    table.string('id');
    table.string('price_change');
    table.string('price_change_pct');
    table.string('volume');
    table.string('volume_change');
    table.string('volume_change_pct');
    table.string('market_cap_change');
    table.string('market_cap_change_pct');
}).then(() => {
    console.log("1d table created successfully....")
}).catch(() => {
    console.log("1d table already exists!")
})

// Create 7d table
knex.schema.createTable('7d', function (table) {
    table.string('id');
    table.string('price_change');
    table.string('price_change_pct');
    table.string('volume');
    table.string('volume_change');
    table.string('volume_change_pct');
    table.string('market_cap_change');
    table.string('market_cap_change_pct');
}).then(() => {
    console.log("7d table created successfully....")
}).catch(() => {
    console.log("7d table already exists!")
})

// Create 30d table
knex.schema.createTable('30d', function (table) {
    table.string('id');
    table.string('price_change');
    table.string('price_change_pct');
    table.string('volume');
    table.string('volume_change');
    table.string('volume_change_pct');
    table.string('market_cap_change');
    table.string('market_cap_change_pct');
}).then(() => {
    console.log("30d table created successfully....")
}).catch(() => {
    console.log("30d table already exists!")
})

// Create 365d table
knex.schema.createTable('365d', function (table) {
    table.string('id');
    table.string('price_change');
    table.string('price_change_pct');
    table.string('volume');
    table.string('volume_change');
    table.string('volume_change_pct');
    table.string('market_cap_change');
    table.string('market_cap_change_pct');
}).then(() => {
    console.log("365d table created successfully....")
}).catch(() => {
    console.log("365d table already exists!")
})

// Create ytd table
knex.schema.createTable('ytd', function (table) {
    table.string('id');
    table.string('price_change');
    table.string('price_change_pct');
    table.string('volume');
    table.string('volume_change');
    table.string('volume_change_pct');
    table.string('market_cap_change');
    table.string('market_cap_change_pct');
}).then(() => {
    console.log("ytd table created successfully....")
}).catch(() => {
    console.log("ytd table already exists!")
})

module.exports = knex;
