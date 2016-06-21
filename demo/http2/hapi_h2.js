'use strict'
const fs = require('fs')
const Hapi = require('hapi')
const Http2 = require('http2')
const server = new Hapi.Server()
var path = require('path');
let listener = Http2.createServer({
 key: fs.readFileSync(path.resolve(__dirname, './localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, './localhost.crt'))
})

if (!listener.address) {
  listener.address = function() {
    return this._server.address()
  }
}

server.connection({
  listener: listener,
  port: '8080',
  tls: true
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply('hello world')
})

server.start(err => {
  if (err) console.error(err)
  console.log(`Started ${server.connections.length} connections`)
})

// visit : https://localhost:8080/