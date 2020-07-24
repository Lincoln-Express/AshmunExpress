var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'http://ashmunexpress.com/',
	user     : 'AshmunExpressApp',
	password : '$Lincoln1570',
	database : 'AshmunExpress'
});
module.exports = connection