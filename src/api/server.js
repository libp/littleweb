var http = require('http')

var hostname = '127.0.0.1'
var port = 3000

var server = http.createServer(function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.write('<head><meta charset="utf-8"/></head>')
  res.end('<h1>Hello world!</h1>')
})

server.listen(port, hostname, function () {
  console.log('Server running at http://%s:%s', hostname, port)
})
