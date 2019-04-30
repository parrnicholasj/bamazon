var mysql = require("mysql");

require("dotenv").config();

var userRequest = process.argv[2];

var userItem = process.argv.slice(3).join(" ");


var connection = mysql.createConnection({
  host: "localhost",
  
  port: 3306,
 
  user: "root",
  
  password: process.env.DB_PW,
  database: "bamazon_db"
});

//inquirer list all the possible things so user can pick

//then ask how much they want to buy

//if there is enough in stock subtract from stock

//then show how much it cost