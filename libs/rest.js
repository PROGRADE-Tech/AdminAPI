const db = require('./db')
const crypto = require('crypto')

module.exports.token


module.exports = {
	TOKEN_MIN_LENGTH: 8,
	TOKEN_MAX_LENGTH: 32,

	go: function(params) {
		db.initialize(params.db_host, params.db_name, params.db_user, params.db_pass, () => {
			this.initToken(params.token, (token) => {
				this.token = token
				console.log('TOKEN:' + this.token)
			})
		})
	},

	initToken: function(preset, callback) {
		var finalToken
		if(preset) {
			// A preset token string was defined
			// Check if secure enough
			if(preset.length >= this.TOKEN_MIN_LENGTH && preset.length <= this.TOKEN_MAX_LENGTH) {
				// OK: Use the token
				 finalToken = preset
			} else {
				finalToken = this.generateToken()
			}
		} else {
			finalToken = this.generateToken()
		}

		callback(finalToken)
	},

	generateToken: function() {
		const random = crypto.randomBytes(256).toString('hex')
		const token = crypto.createHash('sha256')
			.update(random)
			.digest('hex')
			.substring(0, this.TOKEN_MAX_LENGTH)

		return token
	}
}
