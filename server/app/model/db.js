var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
  host: 'db-mysql-nyc1-17901-do-user-586576-0.b.db.ondigitalocean.com',
  port: '25060',
  user: 'discord',
  password: 'discord',
  database: 'discord'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;