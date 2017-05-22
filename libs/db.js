const mysql = require('mysql2')

module.exports.connection

module.exports = {
	initialize: function(db_host, db_name, db_user, db_pass, callback) {
		this.connection = mysql.createConnection({
			host: db_host,
			database: db_name,
			user: db_user,
			password: db_pass
		})
	}
}
