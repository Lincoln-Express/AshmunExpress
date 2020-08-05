var mysql = require('mysql');
var connection = mysql.createPool({
	connectionLimit : 10,
	host     : '107.180.55.9',
	user     : 'AshmunExpressApp',
	password : '$Lincoln1570',
	database : 'AshmunExpress',
	acquireTimeout: 1000000,
	queueLimit:100000
});
connection.getConnection(function(err,connection) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
   
	console.log('connected as id ' + connection.threadId);
  });
module.exports = connection