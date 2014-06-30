var app = require('./lib/server');

app.config = require('./config')(app);

app.listen(config.port, config.ip, function () {
  console.log( "Listening on " + config.ip + ", port " + config.port )
});
