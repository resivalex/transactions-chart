var express = require('express')

var app = express()

app.use(express.static('build'))

var server = app.listen(8282, function () {
  var port = server.address().port
  console.log('Server started at http://localhost:%s', port)
})
