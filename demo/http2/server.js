var fs = require('fs');
var h2 = require("http2")
var path = require('path');
function onRequest(req, res) {
       console.log(req.url)
      res.writeHead(200);
      res.end("it works")
}
var server = h2.createServer({
  key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '/localhost.crt'))
}, onRequest);

server.listen(8080);
console.log('listen 8080\n')