// 目前测试下来，一个浏览器一个页面,大量css资源，但是他们都会使用一个socket connection。两个浏览器（chrome,edge)就各用个的。
// This fixes the “Head of Line” blocking that has plagued HTTP/1, 
// as it means requests made on the same connection can now be responded to out of order. 
// This not only lets the server make Quality of Service decision about what to return first, 
// but it also means the client can now happily use a single TCP connection to make all their request

// How? HTTP/2 uses multiplexing to allow many messages to be interleaved together on a connection at the same time, so that one large response (or one that takes a long time for the server to think about) doesn’t block others.
var fs = require('fs');
var h2 = require("http2")
var path = require('path');
var count=0

var server = h2.createServer({
  key: fs.readFileSync(path.join(__dirname, '/localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, '/localhost.crt'))
}, onRequest);

server.listen(8080);

function onRequest(req, res) {
		// console.log(Object.prototype.toString.call(req.socket))
		// 要是remotePort一样的话，就说明使用的是一个连接。因为在socket api内，4元组构成一个连接，本地远程地址，本地端口都是一样的，只有远程端口不同。
		console.log(req.socket.remotePort)
		var u = req.url 
		if(u =="/"){
			res.writeHead(200);
			console.log("stream:",res.stream.id)
			// console.log("stream:",res.stream.connection)

			res.end(html())
		}else{

			res.writeHead(200);
			console.log("stream:",res.stream.id)
			
			res.end(css())
		}
}
function html(){
	var a = `
				<html>
				<head>
					$1
				</head><body>it works</body></html>`
	var b = `<link rel="stylesheet" type="text/css" href="$1.css">`
	var c = ""
	for (var i=0 ;i<100;i++){
		c+= b.replace("$1",i)
		c+= "\n"
	}
	c = a.replace("$1",c)
	return c
}
function css(){
	var a = ``
	for (var i=0 ;i<100;i++){
		a+= "-"
	}
	return a
}

