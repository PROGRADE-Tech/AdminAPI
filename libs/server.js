const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 8080;

module.exports.router = express.Router();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', module.exports.router);
app.listen(port);
