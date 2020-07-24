var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'Grampsboy',
	password : 'BallzariaFO69',
	database : 'nodelogin'
});
module.exports = connection