
var http = require('http');

var server = http.createServer(function handle (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello node + mongodb workshop');
})

server.listen(8000);

console.log('http server listening on http://localhost:%d', 8000);
console.log('CTRL+C to exit');

