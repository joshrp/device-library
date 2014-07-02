var app = require('./lib/server');

app.listen(app.config.port, app.config.ip, function () {
  console.log( "Listening on " + app.config.ip + ", port " + app.config.port )
});
