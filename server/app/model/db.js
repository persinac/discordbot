var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
  host     : '0.0.0.0',
  user     : 'root',
  password : '',
  database : 'discord'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;