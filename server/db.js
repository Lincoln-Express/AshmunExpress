var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'ashmunexpress.com',
	user     : 'AshmunExpressApp',
	password : '$Lincoln1570',
	database : 'AshmunExpress'
});
connection.connect(function(err) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
   
	console.log('connected as id ' + connection.threadId);
  });
module.exports = connection