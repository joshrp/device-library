var restify     = require('restify'),
    routes      = require('./routes'),
    fs          = require('fs')

var app         = restify.createServer(),
    config      = require('../config')(app)

app.config = config;
app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

routes(app)

module.exports = app;
