var restify     = require('restify'),
	routes       = require('./lib/routes'),
    fs          = require('fs')

var app         = restify.createServer(),
	config      = require('./config')(app)

app.config = config;
app.use(restify.queryParser())
app.use(restify.CORS())
app.use(restify.fullResponse())

routes(app)

app.listen(config.port, config.ip, function () {
  console.log( "Listening on " + config.ip + ", port " + config.port )
});