const dotenv = require('dotenv');
const path = require("path");

// Environment variables
let confPath = path.join(__dirname, '../', '.env');
dotenv.config({ path: confPath });

var port = process.env.PORT || 3000;
var db_server = process.env.DB_SERVER || "localhost";
var db_port = process.env.DB_PORT || "27017";
const db_name = process.env.DB_NAME || "ev";

module.exports = { 
    'http_port': port,
    'database_name': db_name,
    'database_server': db_server,
    'database_port': db_port   
};
