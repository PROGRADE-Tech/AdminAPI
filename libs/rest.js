const db = require('./db')
const crypto = require('crypto')
const server = require('./server')
const calls = require('./calls')

module.exports.token

module.exports = {
	TOKEN_MIN_LENGTH: 8,
	TOKEN_MAX_LENGTH: 32,

	go: function(params) {
		db.initialize(params.db_host, params.db_name, params.db_user, params.db_pass, () => {
			this.initToken(params.token, (token) => {
				this.token = token
				var warn = ''

				if(token != params.token) {
					warn = 'User defined token not supplied or not secure enough. The following auto generated token WILL change on restart. \nIt is recommended to set a static access passphrase in auth.json instead.'
				}

				console.log(warn + '\nTOKEN:\t' + this.token)

				calls.go()

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
