var restify     = require('restify'),
    routes      = require('./routes'),
    fs          = require('fs'),
		dino				= require('dino');

var app         = restify.createServer(),
    config      = require('../config/' + process.env.DEV_LIB_CONFIG)(app)

app.config = config;
app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

dino.connect(app.config.db);

routes(app)

module.exports = app;
