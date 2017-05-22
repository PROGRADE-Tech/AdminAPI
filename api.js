const jsonfile = require('jsonfile')
const rest = require('./libs/rest')

jsonfile.readFile('config/auth.json', (err, params) => {
	if(err) {
		console.error('Whoops! Authentication file `auth.json` could not be found. \nMake sure to copy the example file like this: `cp config/auth.json.example auth.json`.\n\n')
	} else {
		rest.go(params)
	}
})
