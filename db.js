var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'Grampsboy',
	password : 'Grampsboy',
	database : 'nodelogin'
});
module.exports = connection