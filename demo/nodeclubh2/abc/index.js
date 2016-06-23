
'use strict'
const fs = require('fs')
const Hapi = require('hapi')
const Http2 = require('http2')
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


const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ listener:listener,port: 3000 });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/ajax/topics',
    handler: function (request, reply) {
        var url ="./img/88caadc211781b5ba82d07e435443213"
        reply([
               { title: 'Learn JavaScript' ,replys : 1111,visits:3,avatar:url},
               { title: 'Learn Vue.js' ,replys : 2,visits:2,avatar:url},
               { title: 'Build Something Awesome' ,replys : 3,visits:1,avatar:url}
             ]);
    }
});
server.route({
    method: 'GET',
    path: '/ajax/1',
    handler: function (request, reply) {
        a(function(err,topics){
            if (!err)
                reply(topics);    
            else
                reply(err)
        })
        
        
    }
});
// cb (err,topics)
function a (cb){
    var url ="./img/88caadc211781b5ba82d07e435443213"
    var a = [
               { title: 'Learn JavaScript' ,replys : 1111,visits:3,avatar:url},
             ] 
    var Topic = require("./node/proxy/topic")
    var query  ={} //all
    var options = { skip: 0, limit: 10, sort: '-top -last_reply_at'};
    Topic.getTopicsByQuery(query, options, cb);
}
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});