const db = require('./db')
const server = require('./server')

module.exports = {
	go: function() {
		server.router.get('/', function(req, res) {
			res.json({ message: 'from rest.js!' });   
		})
	}
}
