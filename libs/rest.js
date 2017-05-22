const db = require('./db')

module.exports = {
	go: function(params) {
		db.initialize(params.db_host, params.db_name, params.db_user, params.db_pass, () => {
			// Provide RESTful API calls here...
		})
	}
}
