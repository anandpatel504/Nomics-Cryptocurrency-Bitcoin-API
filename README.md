# Nomics-Cryptocurrency-Bitcoin-API

In this project, I fetched the data from Nomics Cryptocurrency Bitcoin API and stored the data in MySQL database. for this API I used the Express framework of NodeJS, Knex query builder and Axios which is a promise-based HTTP client that works both in the browser and in a node.js environment.
## Requirements

If you're using Linux-based OS, install the latest version of Nodejs and npm, by typing the following commands on your terminal.

```
sudo apt update
sudo apt install build-essential apt-transport-https lsb-release ca-certificates curl

```
Then, for the **Latest** release (version 12), add this PPA, by typing the following command on your terminal

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs

```
Now, you need to install necessary dependencies using npm (node-package-manager), open your termial, and first type <br>
`npm init` to initialize **package.json** file. Then, type <br>


       npm install express
       npm install knex
       npm install axios
  

Next, you've to install mysql-database into your system. For this, write these following commands on your terminal.

       sudo apt-get update
       sudo apt-get install mysql-server
