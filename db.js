var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'Grampsboy',
	password : 'ballzariaFO69',
	database : 'nodelogin'
});
module.exports = connection