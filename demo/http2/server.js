var fs = require('fs');
var h2 = require("http2")
var path = require('path');
var count=0
function onRequest(req, res) {
	res.writeHead(200);
	res.end("it works1")
}
var server = h2.createServer({
  key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '/localhost.crt'))
}, onRequest);

server.listen(8080);

